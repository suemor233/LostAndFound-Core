# LostAndFound-Core

[失物招领小程序]('https://github.com/suemor233/LostAndFound-weapp') 的服务器

## 技术栈

- mongoose
- NestJS

## 开发

```sh
pnpm i
pnpm dev
```

## 部署

```
wget https://fastly.jsdelivr.net/gh/suemor233/LostAndFound-Core@master/docker-compose.yml
wget https://fastly.jsdelivr.net/gh/suemor233/LostAndFound-Core@master/.env.example -O .env
编辑 .env 文件
docker compose up -d
```
