FROM node:16.17.1

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

COPY . .

RUN yarn install

RUN yarn prisma generate
RUN yarn prisma migrate deploy

EXPOSE 5555

CMD [ "yarn", "dev" ]