FROM node:22-bookworm-slim

ENV NODE_ENV=production
ENV PORT=8080
ENV DB_DIRECTORY=/app/data

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server ./server
COPY public ./public

RUN mkdir -p /app/data && chown -R node:node /app
USER node

EXPOSE 8080
CMD ["npm", "start"]
