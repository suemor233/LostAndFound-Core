FROM node:16-alpine as builder
WORKDIR /app
COPY . .
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm bundle

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/out .
ENV TZ=Asia/Shanghai
EXPOSE 2349

CMD ["npm", "start:prod"]