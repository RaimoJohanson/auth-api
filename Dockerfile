FROM node:10-alpine

# Copy over dep list
COPY package.json /home/node/app/package.json
RUN chown -R node:node /home/node/app

RUN npm install -g pm2 --no-optional
RUN npm install -g knex

# Set working directory
WORKDIR /home/node/app

# Install dependencies
RUN npm install
RUN chown -R node:node /home/node/app
USER node

# Copy the code to the working directory
COPY . /home/node/app

EXPOSE 3010

CMD [ "pm2", "start", "server.js", "--no-daemon" ]
