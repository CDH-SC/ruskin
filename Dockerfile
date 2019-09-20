### STAGE 1: Build ###

# Label this stage as 'builder'
FROM node:latest
ENV a /mf-angular
ENV e /mf-api
ENV PORT 80
ENV DB_HOST mongodb://mf_db2:27017/mf

COPY .${a}/package.json ./

# Install node modules
RUN npm i -dd && mkdir ${a} && cp -R ./node_modules ${a}

RUN rm /package.json 

WORKDIR ${a}

# Bring in the source code
COPY .${a} .
RUN $(npm bin)/ng --version
RUN $(npm bin)/ng build

RUN ls -lah

WORKDIR /
### STAGE 2: Server ###

COPY .${e}/package.json .${e}/package-lock.json ./

# Install node modules
RUN npm i -dd && mkdir ${e} && cp -R ./node_modules ${e} && cp package.json ${e}

WORKDIR ${e}

# Server source code
COPY .${e} .

RUN ls -lah

CMD ["npm", "start"]
