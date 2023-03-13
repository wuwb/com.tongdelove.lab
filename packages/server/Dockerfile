FROM mhart/alpine-node:15.4 AS builder

RUN apk add --update --no-cache yarn py-pip g++ make && rm -rf /var/cache/apk

RUN mkdir -p /home/node/app

RUN addgroup -S node \
  && adduser -S -D -h /home/node node node \
  && chown -R node:node /home/node
USER node

WORKDIR /home/node/app

COPY package.json ./
# COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn --ignore-engines --frozen-lockfile
# RUN npm install

COPY --chown=node:node . .


RUN yarn prebuild && yarn build


####################################################

FROM node:16
LABEL maintainer="Wu Wenbin"

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start:prod"]
