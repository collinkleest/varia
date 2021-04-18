FROM node:12

# copy app files
COPY . /app

# change directory into frontend
WORKDIR /app/frontend

# install dependencies and build frontend
RUN yarn install

RUN yarn build

# change directory back to main app
WORKDIR /app

# install dependencies and build app
RUN yarn install

RUN yarn build

EXPOSE 443

CMD ["yarn", "start"]