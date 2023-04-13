FROM node AS builder-web

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY web/package*.json .

# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm i

# Bundle app source
COPY web .

CMD [ "npm", "run", "build" ]


FROM node AS builder-server

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY server/package*.json .

# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm i

# Bundle app source
COPY server .

CMD [ "npm", "run", "build" ]


FROM alpine

WORKDIR /usr/src/app

RUN apk add --no-cache --update nodejs npm

COPY --from=builder-web /usr/src/app/dist ./web/dist
COPY --from=builder-server /usr/src/app/dist ./server/dist
COPY --from=builder-server /usr/src/app/node_modules ./server/node_modules

RUN cd /usr/src/app/server

EXPOSE 8081

CMD [ "npm", "run", "start" ]
