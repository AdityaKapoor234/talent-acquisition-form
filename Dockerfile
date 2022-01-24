# Dockerfile

# base image
FROM node:14.18-alpine3.12

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy package file
COPY package.json package-lock.json /usr/src/

# install dependencies
RUN npm install

# copy source files
COPY . /usr/src

# start app
ARG ENV="qa"
RUN npm run build:$ENV
EXPOSE 2000
CMD npm run start -p 2000
