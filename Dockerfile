FROM node
RUN npm install -g gulp babel-cli
WORKDIR /src
EXPOSE 80
