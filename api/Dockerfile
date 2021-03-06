FROM node:14.16.0-alpine3.10
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD ["npm", "start"]