FROM node:18-alpine

WORKDIR /usr/src/rest-service

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "node", "dist/main" ]