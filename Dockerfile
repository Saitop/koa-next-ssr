FROM node:10.16.0-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
RUN yarn install --production

ARG NODE_ENV=production

# create and set app directory as current dir
COPY . ./

RUN yarn build

EXPOSE 3000
CMD ["node", "server/index.js"]

# docker build -t koa-ssr:1.0 .
