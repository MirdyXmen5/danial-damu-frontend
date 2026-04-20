# Build stage
FROM node:20.12-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
# We must build with correct base for Nginx
RUN npm run build

# Production stage
FROM nginx:1.25.4-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
