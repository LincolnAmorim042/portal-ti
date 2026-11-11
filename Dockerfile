# ===========
# Frontend
# ===========
FROM node:20-alpine AS frontend

WORKDIR /client

COPY client/package*.json ./
RUN npm install

COPY client .
RUN npm run build


# ===========
# Backend
# ===========
FROM node:20-alpine

WORKDIR /app

COPY gateway/package*.json ./
RUN npm install --omit=dev

COPY gateway ./gateway

# build do Vue
COPY --from=frontend /client/dist ./client/dist

EXPOSE 3000

CMD ["node", "gateway/server.js"]