FROM node:12
WORKDIR /app
ADD package.json /app/
COPY public /app/public
COPY src /app/src
RUN npm install
EXPOSE 3000
CMD npm start
