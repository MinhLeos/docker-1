FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY .env.${NODE_ENV} .env

RUN if [ "$NODE_ENV" != "development" ]; then npm run build; fi

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'development' ]; then npm run dev; else npm run preview -- --host; fi"]
