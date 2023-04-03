FROM node:18.13-alpine3.16

WORKDIR /app

COPY . /app/

RUN npm i

RUN npm i -g nodemon

RUN npm i -g ts-node

ENTRYPOINT npm start

EXPOSE 3001