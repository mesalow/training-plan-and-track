# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /app
RUN apk add --no-cache bash
COPY package.json yarn.lock babel.config.js vue.config.js ./
RUN yarn install
COPY . ./
RUN yarn run build
CMD ["yarn", "watchbuild"]