FROM node:14.16.0-alpine3.10 as build-stage
WORKDIR /usr/src/frontend/
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ .
RUN npm run build

FROM nginx:alpine as production-stage
RUN rm -rf /etc/nginx/conf.d
COPY default.conf /etc/nginx/conf.d/
COPY --from=build-stage /usr/src/frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

