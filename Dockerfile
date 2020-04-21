FROM node:13.13.0-stretch

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

COPY .babelrc .babelrc
COPY src src

CMD ["npm","start"]