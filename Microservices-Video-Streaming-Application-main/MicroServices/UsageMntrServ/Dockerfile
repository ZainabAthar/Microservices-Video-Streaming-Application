FROM node:21-alpine3.18
WORKDIR /app
COPY package*.json .
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 4004
CMD ["nodemon","app.js"]
