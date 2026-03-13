# Application dependencies stage
FROM node:25-alpine3.22 AS app-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@latest-10;
RUN pnpm i;

# Application build stage
FROM node:25-alpine3.22 AS app-builder 
ARG API_URL
ARG WS_URL
ENV NEXT_PUBLIC_API_URL=${API_URL}
ENV NEXT_PUBLIC_WS_URL=${WS_URL}
WORKDIR /app
COPY --from=app-deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm@latest-10;
RUN pnpm run build;

# Application runtime
FROM node:25-alpine3.22
WORKDIR /app
ENV NODE_ENV=production
COPY --from=app-builder /app/.next ./.next
COPY --from=app-builder /app/public ./public
COPY --from=app-deps /app/package.json ./package.json
COPY --from=app-deps /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "run", "start"]
