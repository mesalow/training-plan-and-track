# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /app
RUN apk add --no-cache bash
COPY package.json babel.config.js vue.config.js ./
COPY . ./
RUN yarn install
RUN yarn build
CMD ["yarn", "watchbuild"]