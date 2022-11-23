FROM node:18

WORKDIR /service

COPY . /service

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm","run","start:prod"]
