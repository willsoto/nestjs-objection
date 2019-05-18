FROM node:12-alpine

WORKDIR /src/app

RUN apk update &&\
  apk upgrade &&\
  apk add python make g++

COPY ./package.json ./yarn.lock ./

RUN ["yarn", "install", "--frozen-lockfile"]
