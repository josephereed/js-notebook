FROM node:alpine

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install --upgrade

COPY ./ ./

RUN yarn build

FROM nginx

EXPOSE 80

COPY --from=0 /home/node/app/build /usr/share/nginx/html