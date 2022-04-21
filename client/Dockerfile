# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /app
RUN apk add --no-cache bash
COPY package.json babel.config.js vue.config.js tsconfig.json .eslintrc.js postcss.config.js tailwind.config.js yarn.lock ./
COPY . ./
RUN yarn install --frozen-lockfile
#CMD ["sleep", "600"]
CMD ["yarn", "watchbuild"]