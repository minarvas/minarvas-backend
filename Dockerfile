FROM node:18

# Setting locale
ENV LANG=C.UTF-8

WORKDIR /app

COPY . .

RUN yarn install 

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:prod"]