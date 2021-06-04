FROM node:14.17.0-alpine

WORKDIR C:\\koulutuspaivat

COPY package.json package-lock.json C:\\koulutuspaivat 

RUN npm install

COPY . C:\\koulutuspaivat

CMD [ "node", "index.js" ]