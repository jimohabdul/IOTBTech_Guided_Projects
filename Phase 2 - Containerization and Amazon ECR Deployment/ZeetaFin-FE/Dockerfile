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

# The recovered build has the backend address baked in; replace it at build time
ARG API_HOST=localhost:3001
RUN find . -path ./node_modules -prune -o -type f \
      \( -name "*.js" -o -name "*.json" -o -name "*.html" -o -name "*.rsc" -o -name "*.body" -o -name "*.meta" \) \
      -exec sed -i "s|localhost:3001|${API_HOST}|g" {} +

USER node
EXPOSE 3000
CMD ["node", "server.js"]