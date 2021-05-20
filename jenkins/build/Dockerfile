FROM node:12
WORKDIR /app
ADD * public src /app/
RUN npm cache clean --force
RUN rm -rf package-lock.json
RUN npm install
EXPOSE 3000
CMD npm start

