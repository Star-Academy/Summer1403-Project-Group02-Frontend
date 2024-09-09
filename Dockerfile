### Build ###
FROM node:20-alpine AS build

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

### Production ###
FROM nginx:stable-alpine-slim AS production

LABEL org.opencontainers.image.source="https://github.com/Star-Academy/Summer1403-Project-Group02-Backend"

WORKDIR /app

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./server.conf /etc/nginx/conf.d/default.conf
RUN nginx -t

EXPOSE 80

COPY --from=build /app/dist/front-end-g02/browser/ /app/
CMD ["nginx", "-g", "daemon off;"]
