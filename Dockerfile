FROM node:18

# Setting locale
ENV LANG=C.UTF-8

WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

RUN yarn install --ignore-engines

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:prod"]