FROM node:latest as stage1
WORKDIR /usr/src/app/client

COPY ["package.json", "./"]
RUN npm install --global typescript
RUN npm install --global @angular/cli
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.13.12-alpine
RUN rm /usr/share/nginx/html/50x.html
RUN rm /etc/nginx/conf.d/default.conf
# COPY --from=stage1 /usr/src/app/client/default.conf /etc/nginx/conf.d/default.conf
COPY --from=stage1 /usr/src/app/client/dist/client /usr/share/nginx/html