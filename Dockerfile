FROM kkarczmarczyk/node-yarn:7.6-slim
MAINTAINER Sergio Behrends

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# Will store in cache unless file chanes
COPY package.json /usr/src/app/
RUN yarn

# Bundle app source
COPY . /usr/src/app
RUN npm run build

EXPOSE 3000
CMD [ "yarn", "start" ]
