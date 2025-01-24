---
updated: 2024/12/06 09:56:53
date: 2024/12/09 18:13:09
categories: 
  - web
title: puppeteer截图转码存储一条龙
post_title: puppeteer截图转码存储一条龙
comments: true
description: ⚠️服务端使用puppeteer注意事项当我们安装 时，它会自动下载最新版的 Chrome和，在本地它通常运行的非常良好。但是当我们将它部署到服务器启动时，它会报各种错误查看故障文档，它在linux上运行还需要再安装一系列的系统依赖项，想要运行起来并没有那么容易参考链接免费的解决方案
---
# **⚠️服务端使用puppeteer注意事项**

当我们安装 `puppeteer`时，它会自动下载最新版的 Chrome和`chrome-headless-shell`，在本地它通常运行的非常良好。

但是当我们将它部署到服务器启动时，它会报各种错误

![img](https://static.jiabanmoyu.com/notes/5eecdaf48460cde58dfa2147842b208b9d786356f42cba500fae826e239291fadf5da1287db9ed9265a117e969287064b3556dd637a4c748b5866e8a8a92427b889008d76156f19a1adbb8d1b959492bc6b4360b8ebdb98d9508fd59fedd0e8f.png)

![img](https://static.jiabanmoyu.com/notes/5eecdaf48460cde58dfa2147842b208b9d786356f42cba500fae826e239291fadf5da1287db9ed9265a117e9692870642e7db3f9075d499c48c14600539619b3f61cd55a3e7a4ca087da9c5b90400cfbd01f0db579f1bd14149565b860957ab4.png)

![img](https://static.jiabanmoyu.com/notes/5eecdaf48460cde58dfa2147842b208b9d786356f42cba500fae826e239291fadf5da1287db9ed9265a117e96928706411c9ac59adaa2024526ea9039de45f2341d1fff6f1034808839e3b1a0f164d221e3a14beb5bc34131051f7e0fe55f913.png)

![img](https://static.jiabanmoyu.com/notes/5eecdaf48460cde58dfa2147842b208b9d786356f42cba500fae826e239291fadf5da1287db9ed9265a117e96928706454d8659e66ee1cfcf17aa88295cbc8ab3a4905eb0247f3ff0665df596a2f5b8122c5e6329b696eb5a900dfd662445084.png)

![img](https://static.jiabanmoyu.com/notes/5eecdaf48460cde58dfa2147842b208b9d786356f42cba500fae826e239291fadf5da1287db9ed9265a117e9692870649af4bc8078ce3967f93dbbf7182ad4038c78849e39645d5dfc942bb6c2bb8ba7327bcd6a758baec2a900dfd662445084.png)

查看故障文档，它在linux上运行还需要再安装一系列的系统依赖项，想要运行起来并没有那么容易

[参考链接](https://pptr.dev/troubleshooting#chrome-doesnt-launch-on-linux)

![img](https://static.jiabanmoyu.com/notes/5eecdaf48460cde58dfa2147842b208b9d786356f42cba500fae826e239291fadf5da1287db9ed9265a117e969287064da46cabd3a4f52910834ae71ecca5ccb419b8baf2979354f835580288370933ba84a4ba4e571b727f2ac17fb040400bd.png)

# **免费的解决方案**

**puppeteer** 提供了`connect`连接远程**Chrome**的方法，我们可以通过docker使用别人制作好的 Chrome 镜像，通过 connect 远程连接获取浏览器实例来进行操作。

[免费的Chrome镜像](https://docs.browserless.io/docker/quickstart)

通过docker compose去部署

```
services:
  browserless:
    restart: unless-stopped
    image: ghcr.nju.edu.cn/browserless/chromium
    container_name: browserless
    ports:
      - "3123:3000"
    environment:
      TZ: Asia/Shanghai
      CONCURRENT: 5
      TOKEN: 4B0Y656Z873497
      TIMEOUT: 60000
      HOST: 0.0.0.0
      DOWNLOAD_DIR: ./down
      ALLOW_FILE_PROTOCOL: 'true'
```

nginx 配置允许web socket 连接

```
server {
  listen 443 ssl;
  server_name broserless.kaibinluo.com;

  ssl_certificate /etc/nginx/ssl/kaibinluo.fullchain.cer;
  ssl_certificate_key /etc/nginx/ssl/kaibinluo.com.key;
  ssl_session_timeout 5m;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
  ssl_prefer_server_ciphers on;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

  location / {
      proxy_pass http://10.0.0.10:3123;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

# **实现截图**

⚠️仅安装 `puppeteer-core`，不安装 `puppeteer`！

⚠️仅安装 `puppeteer-core`，不安装 `puppeteer`！

⚠️仅安装 `puppeteer-core`，不安装 `puppeteer`！

## **设置html内容截图** 

```
import puppeteer from "puppeteer-core";

const getScreenshot = async (html) => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: 'wss://broserless.kaibinluo.com?token=4B0Y656Z873497'
  });
  const page = await browser.newPage();
  await page.setContent(html, {waitUntil: 'domcontentloaded'});
  const ele = await page.$(".container");
  const screenshot = await ele.screenshot({
    encoding: "binary",
    // quality: 50,
    captureBeyondViewport: true,
    type: "png"
  });
  await browser.close();

  return screenshot;
}
```

**代码说明**

1. 通过 `puppeteer.connect`连接到远程浏览器
2. 通过 `browser.newPage`在浏览器打开一个新的页面
3. 通过 `page.setContent`给这个页面设置内容，`{waitUntil: 'domcontentloaded'}`表示dom内容加载成功的时候，视为内容设置成功
4. 通过 `page.$(".container")`获取到我们要进行截图的节点
5. 通过 `ele.screenshot`来对当前节点进行截图，`encoding: "binary"`表示截图以二进制数据返回，`captureBeyondViewport: true`表示我们希望在窗口之外的视图也被截到，`type: "png"`表示我们希望截图是png格式；⚠️ `puppeteer`支持`png|jpeg|webp`三种格式的截图，但是当我们在Debian上使用 `browserless/chromium`镜像时，使用webp格式进行截图时，只会得到空白，通过搜索 `puppeteer`的 issues 看到一个相似的bug https://github.com/puppeteer/puppeteer/issues/7923 ,猜测原因是相同的，所以我们先不使用webp格式
6. 截图成功之后，我们通过 `browser.close`关闭浏览器

## **获取一个url的截图**

```
import puppeteer from "puppeteer-core";

const getScreenshot = async (url) => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: 'wss://broserless.kaibinluo.com?token=4B0Y656Z873497'
  });
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot({
    encoding: "binary",
    // quality: 50,
    captureBeyondViewport: true,
    type: "png"
  });
  await browser.close();

  return screenshot;
}
```

**代码说明**

1. 我们这次通过 `page.goto`跳转到指定的url地址，而不是 `setContent`设置页面内容
2. 我们通过 `page.screenshot`来获取整个页面的截图，而不是获取某个dom节点的截图

# **免费的图片压缩上传方案**

## **图片转码**

我们在上面获取到的图片格式是png的格式，文件比较大，我们将要使用的免费图片存储方案会限制每次上传的图片大小，所以我们希望可以得到一个比较小的图片文件。

本身我们如果能得到webp格式的图片的话，那我们是可以不做这一步的，但问题是拿不到，所以我们就不得不做压缩这一步了。

图片转码方案：https://sharp.pixelplumbing.com/

安装 `sharp`

```
import sharp from 'sharp'

const screenshot = await getScreenshot(html);
console.log('截图完成',screenshot.length)
const img = sharp(screenshot).avif({quality: 50})
```

**代码说明**

1. 通过调用上面写好的 getScreenshot 的方法，我们可以拿到截图的二进制数据
2. 然后调用`sharp`传入二进制数据，然后调用`avif`将png格式的图片转为`avif`格式，图片质量设置为 50%，得到 `Sharp`对象，我们可以再做后续的操作

## **免费的图片存储**

我们可以使用免费的 https://www.picgo.net/ 图床服务，注册账号，然后生成API key，通过调用它的上传接口存储图像

由于它的要的参数是formdata格式编码，所以我们需要安装 `form-data`库

```
import sharp from 'sharp'
import axios from 'axios';
import FormData from 'form-data';

const screenshot = await getScreenshot(html);
console.log('截图完成',screenshot.length)
const img = sharp(screenshot).avif({quality: 50})
/*********************************************************/
const buff = await img.toBuffer()
const form = new FormData();
form.append('source', buff, {
  filename: `${dayjs().format('YYYY-MM-DD')}.avif`, // 指定文件名
  contentType: 'application/octet-stream' // 指定 MIME 类型
})
form.append('format', 'json')

const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://www.picgo.net/api/1/upload',
  headers: { 
    'X-API-Key': '生成的API key', 
    ...form.getHeaders()
  },
  data : form
};
const result = await axios.request(config)
const imgUrl = result?.data?.image?.url
```

**代码说明**

1. 我们通过 `img.toBuffer`将转码后的图片转为buffer
2. 根据 **picgo** 的接口文档，将二进制数据给source，指定文件名字和数据类型
3. `form.append('format', 'json')`我们希望返回的数据是JSON格式
4. 最后通过axios调用接口上传文件，最后拿到上传后的图片地址

# puppeteer 扩展

## **SEO**

在nginx层根据agent判断请求是否来自搜索引擎，如果来自搜索引擎，将请求转发到 `puppeteer`服务，通过 `page.goto`去渲染页面，然后通过 `page.content`拿到渲染后的页面的html，将html返回，使搜索引擎进行关键词抓取

## **爬虫**

通过`page.goto`跳转到具体页面后，通过 `page.$`或 `page.$$`获取ElementHandle

```
await page.goto(url);
const trList = await page.$$('table tr');
trList.forEach(async tr => {
  const tdListContent = await tr.$$eval('td', (td) => td.textContent);
  console.log(`这一行的数据为`, tdListContent)
})
```

## **输入内容**

```
await page.goto(url);
const input = await page.$('input');
await input.press('hello world')
```

## **点击**

```
await page.goto(url);
const btn = await page.$('button');
await btn.click()
```