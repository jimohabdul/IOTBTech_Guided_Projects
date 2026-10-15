FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Install production dependencies first (better layer caching)
COPY package.json ./
RUN npm config set fetch-retries 5 && npm config set fetch-retry-mintimeout 20000 && npm config set maxsockets 1
RUN npm install --omit=dev --legacy-peer-deps

# Next.js standalone output, static assets and public files
COPY . .

USER node
EXPOSE 3000
CMD ["node", "server.js"]
