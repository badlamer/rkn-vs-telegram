FROM 'node:9.11.1-alpine'


COPY . ./
RUN yarn install

EXPOSE 8080
CMD node ./server.js
