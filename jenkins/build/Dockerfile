FROM node:12
WORKDIR /app
ADD package.json /app/
RUN npm install
COPY . /app
EXPOSE 3000
CMD npm start
