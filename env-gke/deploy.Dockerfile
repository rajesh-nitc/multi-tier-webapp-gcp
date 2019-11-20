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

# install kubectl
# curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
# chmod +x ./kubectl
# mv ./kubectl /usr/local/bin/kubectl

# install helm
# curl -LO https://git.io/get_helm.sh
# chmod 700 get_helm.sh
# ./get_helm.sh
# helm init --service-account tiller
# helm install --debug --dry-run ./helm-chart-dev/
# helm install ./helm-chart-dev/ --name webapp-dev --namespace=default