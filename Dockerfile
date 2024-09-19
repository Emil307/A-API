FROM node:18

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

# pnpm 49.2s
# npm 109.9s
# :)