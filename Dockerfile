FROM node:22.14 AS builder

WORKDIR /usr/src/app
COPY package*.json ./
COPY .eslintrc* ./
COPY .prettierrc* ./

RUN npm install

COPY . .
RUN npm run build

FROM node:22.14 AS production

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src/config ./dist/src/config

USER node

EXPOSE 3000
CMD ["npm", "run", "start:prod"]


FROM node:22.14 AS development

RUN apt-get update && \
    apt-get install -y wget gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add - && \
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list && \
    apt-get update && \
    apt-get install -y mongodb-mongosh && \
    apt-get clean

RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/local/bin/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

WORKDIR /usr/src/app

COPY package*.json ./
COPY .eslintrc* ./
COPY .prettierrc* ./

RUN npm install

COPY . .