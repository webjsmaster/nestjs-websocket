FROM node:18.6-alpine

WORKDIR /usr/app

COPY package.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN npm install && npm cache clean --force

RUN npm i nodemon -g

RUN npm run build

COPY . .

EXPOSE 80

# RUN npm run migration:generate

CMD  ["npm", "run", "start"]
