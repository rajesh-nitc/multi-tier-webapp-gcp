FROM node:latest
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install typescript --global
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN tsc
EXPOSE 3003
CMD npm start

#docker run -d -it --name deploy -p 3003:3003 -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker -v /usr/local/bin/docker-compose:/usr/bin/docker-compose rajesh12/smartserver:deploy