FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# Install production dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm config set fetch-retries 5 && npm config set fetch-retry-mintimeout 20000 && npm config set maxsockets 1
RUN npm ci --omit=dev --legacy-peer-deps

# Compiled NestJS application
COPY dist ./dist

USER node
EXPOSE 3000
CMD ["node", "dist/main"]
