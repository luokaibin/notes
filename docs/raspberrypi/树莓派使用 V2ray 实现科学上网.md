

## 基础设施

> 硬件 **树莓派**，如果是云服务器的话，一般不会需要科学上网，笔者之所以需要科学上网主要是因为 docker 镜像拉取过慢，如果你使用的使云服务器的话，像阿里云、腾讯云他们会有集成 docker 的系统镜像，拉取镜像速度是非常快的，完全不需要科学上网。

## 需求背景

当我们使用 Docker 拉取镜像的时候，因为 docker 镜像源在国外的原因，经常会拉取失败，或者拉取速度特别慢。这个时候一般会尝试更换 docker 镜像源，笔者更换了镜像源之后，拉取速度确实变快了，但是用了没两个月又变慢了。这个时候可以考虑第二种方法，给树莓派安装 V2Ray 来实现科学上网。

## Docker 搭建 V2Ray

科学上网的工具笔者就知道两种，一种 SSR，一种 V2Ray，SSR 的部署没有成功，最后用了 V2Ray，如果你也有科学上网需求的话，可以继续往下看。

**以下方法适用于树莓派，笔者树莓派型号为 4B**

> **这里推荐使用 `1.3.3` 版本的镜像，最新版是 1.5.4(2021-10-10)，经测试通过 docker 部署1.5.4 存在一些问题，这里推荐使用 1.3.3 版本**

### docker 命令直接部署

```shell
docker run -d --restart=always --privileged --network=host --name v2raya -v /lib/modules:/lib/modules -v /etc/resolv.conf:/etc/resolv.conf -v /etc/v2raya:/etc/v2raya mzz2017/v2raya:1.3.3
```

这里使用的是 mzz2017/v2raya 这个镜像，因为树莓派是 arm/v7 架构，支持的镜像并不多，所以也没有其他选择，用这个镜像就好。

### docker-compose 部署

在你要部署 V2Ray 的目录建一个 `docker-compose.yml` 文件，然后在 `docker-compose.yml` 文件中写入以下内容

```yml
version: '3'
services:
  v2raya:
    privileged: true
    network_mode: host
    restart: always # 代表只要docker启动，那么这个容器就跟着一起启动
    image: mzz2017/v2raya:1.3.3 # 指定镜像路径
    container_name: v2raya # 指定容器名称
    environment: # 指定环境信息
      V2RAYA_VERBOSE: 'true'
      TZ: Asia/Shanghai # 指定时区
    volumes: # 配置数据卷
      - /etc/v2raya:/etc/v2raya
      - /lib/modules:/lib/modules
      - /etc/resolv.conf:/etc/resolv.conf
```

然后 **`docker-compose up -d`** 部署

## 使用

部署好之后，我们浏览器通过 `ip:2017` 访问，第一次访问会让你创建一个管理员账号，如果遗忘，使用`docker exec v2raya v2raya --reset-password`命令重置。

![创建账号](https://static.jindll.com/notes/create-account.png)

然后我们登录进管理页面，以创建或导入的方式导入节点，导入支持节点链接、订阅链接、扫描二维码和批量导入等方式。

![image-20211010173310171](https://static.jindll.com/notes/image-20211010173310171.png)

![连接节点](https://static.jindll.com/notes/connect1.png)

导入成功后，节点将显示在 `SERVER` 或新的标签中。如图是导入了一个订阅后的界面。

![连接节点](https://static.jindll.com/notes/connect2.png)

切换到该标签页，选择一个节点连接。

连接成功后切换到服务器，执行下面命令

```
$# curl ip.sb
165.154.224.14
```

然后查看IP所属地判断成功与否

————————————————- **end** ————————————-