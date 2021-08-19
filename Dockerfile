
# stage 1: base stage
FROM node:14.15.1-alpine

# create directory for the container
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
COPY eslint.json ./

# copy source code to /app/src folder
COPY src /app/src
COPY test /app/test

RUN npm install -g typescript
RUN npm install
RUN npm ci
RUN tsc

# start
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
