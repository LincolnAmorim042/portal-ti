const repository = require("../repositories/userRepository");
const audit = require("../utils/audit");

const {
    generatePortalToken,
    comparePassword
} = require("../services/authService");

const {
    TOKEN_COOKIE
} = require("../middleware/auth");

// =========================
// LOGIN
// =========================

async function login(req, res) {

    try {

        const {

            username,
            password

        } = req.body;

        const dbUser =
            await repository.findByUsername(username);

        if (!dbUser) {

            return res.status(401).json({

                success:false,
                message:"Usuário ou senha inválidos."

            });

        }

        if (!dbUser.active) {

            return res.status(401).json({

                success:false,
                message:"Usuário desativado."

            });

        }

        const valid =
            await comparePassword(

                password,
                dbUser.password

            );

        if (!valid) {

            return res.status(401).json({

                success:false,
                message:"Usuário ou senha inválidos."

            });

        }

        await repository.updateLastLogin(dbUser.id);

        const token =
            generatePortalToken(dbUser);

        res.cookie(

            TOKEN_COOKIE,

            token,

            {

                httpOnly:true,
                sameSite:"lax",
                secure:false

            }

        );

        await audit.log(

            req,

            "Autenticação",

            "Login",

            username

        );

        res.json({

            success:true

        });

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

}

// =========================
// LOGOUT
// =========================

async function logout(req,res){

    res.clearCookie(TOKEN_COOKIE);

    await audit.log(

        req,

        "Autenticação",

        "Logout",

        req.user.username

    );

    res.json({

        success:true

    });

}

// =========================
// USUÁRIO LOGADO
// =========================

function me(req,res){

    res.json({

        success:true,

        data:{

            id:req.user.id,

            username:req.user.username

        }

    });

}



module.exports = {

    login,
    logout,
    me

};