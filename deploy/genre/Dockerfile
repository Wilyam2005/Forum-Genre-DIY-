FROM node:22-bookworm-slim

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server ./server
COPY database.sql ./database.sql
COPY public ./public

RUN chown -R node:node /app
USER node

EXPOSE 8080
CMD ["npm", "start"]
