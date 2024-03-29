### STAGE 1: Build ###

# Label this stage as 'builder'
FROM node:14.16.1
ENV a /ruskin-angular
ENV e /ruskin-api
ENV PORT 80
ENV DB_HOST mongodb://ruskin_db2:27017/ruskin

COPY .${a}/package.json ./

# Install node modules
RUN npm i -dd && mkdir ${a} && cp -R ./node_modules ${a}

RUN rm /package.json

WORKDIR /
### STAGE 2: Server ###

COPY .${e}/package.json .${e}/package-lock.json ./

# Install node modules
RUN npm i -dd && mkdir ${e} && cp -R ./node_modules ${e} && cp package.json ${e}


WORKDIR ${a}

# Bring in the source code
COPY .${a} .
RUN $(npm bin)/ng --version
RUN $(npm bin)/ng build

RUN ls -lah

WORKDIR ${e}

# Server source code
COPY .${e} .

RUN ls -lah

CMD ["npm", "start"]
