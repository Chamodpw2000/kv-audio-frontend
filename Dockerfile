# Stage 1: Build React app
FROM node:20-alpine3.21 AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

# VITE_BACKEND_URL="" makes all API calls relative (/api/...)
# Nginx in Stage 2 then proxies /api/* to backend-service:3000
ARG VITE_BACKEND_URL=""
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

# Stage 2: Serve with Nginx as non-root on port 8080
FROM nginx:1.27-alpine

# Allow non-root user to write nginx temp/cache dirs
RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && mkdir -p /var/cache/nginx /var/run/nginx \
    && chown -R appuser:appgroup /var/cache/nginx /var/run/nginx \
    && chown -R appuser:appgroup /usr/share/nginx/html \
    && touch /var/run/nginx.pid \
    && chown appuser:appgroup /var/run/nginx.pid

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

USER appuser

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
