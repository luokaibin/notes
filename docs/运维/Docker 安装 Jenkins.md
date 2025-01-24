

## 安装

### docker 容器运行

```shell
docker run -u root --rm -d -p 8080:8080 -p 50000:50000 -v /data/jenkins/data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkinsci/blueocean
```

## 中文

<img src="https://img.picgo.net/2025/01/24/100003057662e3108c453f5b.avif" alt="image-20211110124757659" style="zoom: 25%;" />

locale

<img src="https://img.picgo.net/2025/01/24/10000306712ebd5002446780.avif" alt="image-20211110125640107" style="zoom:25%;" />

<img src="https://img.picgo.net/2025/01/24/10000307319e95eb32e55f8a.avif" alt="image-20211110125924618" style="zoom:33%;" />

安装了 Locale 插件才有这个设置，填入 **zh_CN**

![image-20211110130350199](https://img.picgo.net/2025/01/24/10000308280436adae7d4580.avif)