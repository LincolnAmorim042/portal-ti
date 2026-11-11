const {
    createProxyMiddleware,
    responseInterceptor
} = require("http-proxy-middleware");

const repository = require("../repositories/systemRepository");


// =====================================================
// BUSCAR SISTEMA
// =====================================================

async function getSystem(req) {

    if (req.system) {
        return req.system;
    }

    const match = req.originalUrl.match(
        /^\/apps\/([^/]+)/
    );

    if (!match) {
        throw new Error(
            "Aplicação não identificada."
        );
    }

    const system =
        await repository.getSystem(match[1]);

    if (!system) {
        throw new Error(
            "Aplicação não encontrada."
        );
    }

    if (system.active !== 1) {
        throw new Error(
            "Aplicação está inativa."
        );
    }

    if (
        system.launch_mode !==
        "portal-sso"
    ) {
        throw new Error(
            "Aplicação não está configurada para proxy."
        );
    }

    return system;
}


// =====================================================
// API
// =====================================================

const apiProxy = createProxyMiddleware({

    changeOrigin: true,

    router: async (req) => {

        const system = await getSystem(req);

        return system.url;
    },

    pathRewrite: (path, req) => {

        const match = req.originalUrl.match(
            /^\/apps\/[^/]+(\/api(?:\/.*)?)$/
        );

        if (!match) {
            return path;
        }

        return match[1];
    }
});


// =====================================================
// FRONTEND
// =====================================================

const frontendProxy = createProxyMiddleware({

    changeOrigin: true,

    router: async (req) => {

        const system = await getSystem(req);
        return system.url;
    },

    pathRewrite: (path, req) => {

        const match = req.originalUrl.match(
            /^\/apps\/[^/]+(\/.*)?$/
        );

        if (!match) {
            return "/";
        }

        const rewrittenPath =
            match[1] || "/";

        return rewrittenPath;
    },

    selfHandleResponse: true,

    on: {

        proxyRes: responseInterceptor(
            async (buffer, proxyRes, req) => {

                const contentType =
                    proxyRes.headers["content-type"] || "";

                const originalUrl =
                    req.originalUrl;

                if (proxyRes.statusCode === 304) {
                    return buffer;
                }
                // =================================================
                // CONTEÚDO BINÁRIO
                // =================================================
                //
                // Imagens, fontes, PDFs, etc.
                // Não alteramos absolutamente nada.
                //

                const isBinary =
                    contentType.includes("image/") ||
                    contentType.includes("font/") ||
                    contentType.includes("application/octet-stream") ||
                    contentType.includes("application/pdf") ||
                    contentType.includes("audio/") ||
                    contentType.includes("video/");

                if (isBinary) {
                    return buffer;
                }


                // =================================================
                // IDENTIFICAR APLICAÇÃO
                // =================================================

                const match =
                    originalUrl.match(
                        /^\/apps\/([^/]+)/
                    );

                if (!match) {
                    return buffer;
                }

                const appId = match[1];

                const prefix =
                    `/apps/${appId}`;


                // =================================================
                // HTML
                // =================================================

                if (
                    contentType.includes(
                        "text/html"
                    )
                ) {

                    let html =
                        buffer.toString("utf8");


                    html = html.replace(
                        /(["'(=])\/(?!\/)/g,
                        `$1${prefix}/`
                    );


                    return Buffer.from(html);
                }


                // =================================================
                // JAVASCRIPT
                // =================================================

                if (
                    contentType.includes(
                        "javascript"
                    ) ||
                    contentType.includes(
                        "ecmascript"
                    ) ||
                    contentType.includes(
                        "text/js"
                    )
                ) {

                    let js =
                        buffer.toString("utf8");


                    // API

                    js = js.replace(
                        /(["'`])\/api\//g,
                        `$1${prefix}/api/`
                    );


                    // Assets Vite

                    js = js.replace(
                        /(["'`])\/assets\//g,
                        `$1${prefix}/assets/`
                    );


                    // Assets relativos

                    js = js.replace(
                        /(["'`])\.\.\/\.\.\/assets\//g,
                        `$1${prefix}/assets/`
                    );


                    return Buffer.from(js);
                }


                // =================================================
                // CSS
                // =================================================

                if (
                    contentType.includes(
                        "text/css"
                    )
                ) {

                    let css =
                        buffer.toString("utf8");


                    css = css.replace(
                        /url\(\s*(['"]?)\/(?!\/)/g,
                        `url($1${prefix}/`
                    );


                    return Buffer.from(css);
                }


                // =================================================
                // OUTROS
                // =================================================

                return buffer;
            }
        )
    }
});


module.exports = {
    apiProxy,
    frontendProxy
};