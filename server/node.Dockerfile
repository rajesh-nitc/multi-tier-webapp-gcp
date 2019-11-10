FROM node:latest
WORKDIR /usr/src/app/server
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install typescript --global
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN tsc
EXPOSE 3002
CMD npm start