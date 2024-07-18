

## 安装

### docker 容器运行

```shell
docker run -u root --rm -d -p 8080:8080 -p 50000:50000 -v /data/jenkins/data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkinsci/blueocean
```

## 中文

<img src="https://static.jiabanmoyu.com/notes/image-20211110124757659.png" alt="image-20211110124757659" style="zoom: 25%;" />

locale

<img src="https://static.jiabanmoyu.com/notes/image-20211110125640107.png" alt="image-20211110125640107" style="zoom:25%;" />

<img src="https://static.jiabanmoyu.com/notes/image-20211110125924618.png" alt="image-20211110125924618" style="zoom:33%;" />

安装了 Locale 插件才有这个设置，填入 **zh_CN**

![image-20211110130350199](https://static.jiabanmoyu.com/notes/image-20211110130350199.png)