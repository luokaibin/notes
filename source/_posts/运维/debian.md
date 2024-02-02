---
updated: 2022/08/11 18:33:55
date: 2022/10/23 12:48:16
categories: 
  - 运维
title: debian
post_title: debian
comments: 
description: 安装 nodejsnodejs用 nvm 安装node速度略慢用 nodesource 安装 node速度很快安装docker安装 puppeteer报错中文乱码基于debian镜像构建镜像：1.14G基于node 16.16.0-slim构建镜像：1.19G
---

# 安装 nodejs

## nodejs

```sh
apt-get install nodejs # 12.22.12
apt-get install npm # 7.5.2
```

## 用 nvm 安装node

速度略慢

```sh
# 安装 nvm
curl -o- https://ghproxy.com/https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# 使用 nvm 安装 nodejs
nvm i 16.16.0
# 查看node npm版本
node -v # 16.16.0
npm -v # 8.11.0
```

## 用 nodesource 安装 node

速度很快

```sh
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

apt-get install -y nodejs
# 查看node npm版本
node -v # 16.16.0
npm -v # 8.11.0
```

# 安装docker

```sh
sudo apt-get update # 1

# 2
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 3
sudo mkdir -p /etc/apt/keyrings

# 4
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 5
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 6 必须
sudo apt-get update

# 7
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

# 安装 puppeteer

## 报错

```sh
# 报错：error while loading shared libraries: libnss3.so: cannot open shared object file: No such file or directory
apt-get install libnss3-dev
apt-get install -y libatk-bridge2.0-dev libatk1.0-dev libcups2-dev libxkbcommon-dev libxcomposite-dev libxdamage-dev libxrandr-dev libgbm-dev libpangox-1.0-dev libasound2-dev
```

# 中文乱码

```
apt-get install -y ttf-wqy-zenhei
```

# 基于debian镜像构建

镜像：1.14G

```
FROM debian:stable-slim

RUN echo "" > "/etc/apt/sources.list" \
    && echo "deb http://mirrors.tencentyun.com/debian bullseye main contrib non-free" >> "/etc/apt/sources.list" \
    && echo "deb http://mirrors.tencentyun.com/debian bullseye-updates main contrib non-free" >> "/etc/apt/sources.list" \
    && echo "deb http://mirrors.tencentyun.com/debian-security bullseye-security main contrib non-free" >> "/etc/apt/sources.list" \
    && apt-get update \
    && apt-get -y install curl \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get -y install nodejs \
    && apt-get -y install ttf-wqy-zenhei librust-gobject-sys-dev libnss3-dev libatk1.0-dev libatk-bridge2.0-dev libcups2-dev libdrm-dev libxcomposite-dev libxkbcommon-dev libxdamage-dev libxrandr-dev libgbm-dev libpangox-1.0-dev libasound2-dev

WORKDIR /app
COPY . /app

RUN npm install

EXPOSE 10086
CMD ["node", "app.mjs"]
```

# 基于node:16.16.0-slim构建

镜像：1.19G

```
FROM node:16.16.0-slim

RUN echo "" > "/etc/apt/sources.list" \
    && echo "deb http://mirrors.tencentyun.com/debian bullseye main contrib non-free" >> "/etc/apt/sources.list" \
    && echo "deb http://mirrors.tencentyun.com/debian bullseye-updates main contrib non-free" >> "/etc/apt/sources.list" \
    && echo "deb http://mirrors.tencentyun.com/debian-security bullseye-security main contrib non-free" >> "/etc/apt/sources.list" \
    && apt-get update \
    && apt-get -y install ttf-wqy-zenhei librust-gobject-sys-dev libnss3-dev libatk1.0-dev libatk-bridge2.0-dev libcups2-dev libdrm-dev libxcomposite-dev libxkbcommon-dev libxdamage-dev libxrandr-dev libgbm-dev libpangox-1.0-dev libasound2-dev


WORKDIR /app
COPY . /app

RUN npm install

EXPOSE 10086
CMD ["node", "app.mjs"]
```

