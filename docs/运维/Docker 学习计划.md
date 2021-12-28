---
updated: 2021/07/26 19:53:25
date: 2021/07/26 19:53:25
categories: 
  - 运维
title: Docker 入门
comments: 
lang: zh-CN
tags:
  - Docker
description: Docker 是什么Docker 可以做什么如何配置Docker如何借助Docker隔离环境，实现电脑上同时具备Node，Python，Golang开发环境如何方便的进行资源回收一、Docker 介绍1.1 引言我本地运行没问题啊。环境不一致通过Docker可以提供一致的环境那个哥们又写死循环了，怎么这么卡
---

> 1. Docker 是什么
>
> 2. Docker 可以做什么
> 3. 如何配置Docker
> 4. 如何借助Docker隔离环境，实现电脑上同时具备Node，Python，Golang开发环境
> 5. 如何方便的进行资源回收

## 一、Docker 介绍

### 1.1 引言

> 1. 我本地运行没问题啊。
>
>    环境不一致
>
>    通过Docker可以提供一致的环境
>
> 2. 那个哥们又写死循环了，怎么这么卡
>
>    在多用户的操作系统下，会互相影响
>
>    （在一个系统下，一个应用的系统占用高，另一个应用也会受影响）
>
> 3. 淘宝在双11的时候，用户量暴增
>
>    运维成本过高
>
>    （双十一大量并发，肯定需要增加服务器扩容，提高并发能力，肯定不能依靠运维人员去手动扩容部署）
>
> 4. 学习一门技术，学习成本过高
>
>    关于安装软件成本过高

### 1.2 Docker 的由来

> 一帮年轻人创业，创办了一家公司，2010年的专门做PAAS平台。
>
> 到了2013年的时候，像亚马逊，微软，Google都开始做PAAS平台。
>
> 2013年，将公司内部的核心技术对外开源，核心技术就是Docker。
>
> 到了2014年的时候，得到了C轮融资，$5400w。
>
> 到了2015年的时候，得到了D轮融资，$9500w.
>
> 全神贯注的维护Docker。
>
> 所罗门主要作者之一。

![image-20210131193122611](https://static.jindll.com/notes/image-20210131193122611.png)

> Docker 的作者已经离开了维护Docker的团队。

### 1.3 Docker的思想

> 1. 集装箱
>
>    会将所有需要的内容放到不同的集装箱中，谁需要这些环境就直接拿到这个集装箱就可以了。
>
> 2. 标准化
>
>    1. 运输的标准化：Docker有一个码头（中央仓库），所有上传的集装箱都在这个码头上，当谁需要某一个环境，就直接指派大海疼去搬运这个集装箱就可以了。
>    2. 命令的标准化：Docker提供了一系列的命令，帮助我们去获取集装箱等操作。
>    3. 提供了REST的API，衍生出了很多的图形化界面，比较有名的Rancher
>
> 3. 隔离性
>
>    Docker在运行集装箱内的内容时，会在Linux的内核中，单独地开辟一片空间，这片空间不会影响到其他程序。

> - 注册中心，也叫中央仓库，公共仓库（超级码头，上面放的就是集装箱）
> - 镜像。（集装箱）
> - 容器。（运行起来的镜像）

## 二、Docker的基本操作

### 2.1 安装Docker（centOS7）

> https://docs.docker.com/engine/install/centos/#prerequisites

```sh
# 1. 先安装 yum-utils 软件包（提供yum-config-manager 实用程序）。（yum-utils 不存在的情况下）
yum install -y yum-utils
# 2. 并设置稳定的存储库。
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 3. 安装最新版本的Docker Engine和容器
yum install docker-ce docker-ce-cli containerd.io
# 4. 启动Docker
systemctl start docker
```

```sh
# 1. 卸载Docker Engine，CLI和Containerd软件包
yum remove docker-ce docker-ce-cli containerd.io
# 2. 主机上的映像，容器，卷或自定义配置文件不会自动删除。要删除所有图像，容器和卷：
rm -rf /var/lib/docker
```



### 2.2 Docker的中央仓库

> 1. Docker 官方的中央仓库：这个仓库镜像最全，但速度较慢
>
>    https://hub.docker.com/
>
> 2. 国内的镜像网站：网易蜂巢，daoCloud
>
>    网易蜂巢：https://c.163.com/hub
>
>    daocloud：https://hub.daocloud.io/
>
> 3. 在公司内部会采用私服的方式拉取镜像（添加配置）

```sh
# centsOS 指定镜像源
# 1. 修改/etc/docker/daemon.json文件，如果没有先建一个即可
vim /etc/docker/daemon.json
-
    {
    	"registry-mirrors": ["https://hub.daocloud.io/"]
    }
 # 2. 重新加载 daemon.json 文件
 systemctl daemon-reload
 # 3. 重启docker
 systemctl restart docker
```

### 2.3 镜像操作

```sh
# 1. 拉取镜像到本地
docker pull [镜像名称][:tag]
# 例如 https://hub.daocloud.io/repos/69057358-b212-44df-83b0-82ef65f341a0
docker pull daocloud.io/library/python:3.6.3-stretch
```

```sh
# 2. 查看全部本地的镜像
docker images
```

```sh
# 3. 删除本地镜像
docker rmi ImageID
```

```sh
# 4. 镜像的导入导出（不规范）
# 4.1 将本地的镜像导出
docker save -o 导出的路径 ImageID
# 4.2 加载本地的镜像文件
docker load -i 镜像文件
```

> 4.3 加载本地镜像之后镜像名字和tag都成none了，可以通过docker tag 命令修改
>
> ```
> docker tag 运行起来的镜像ID 要起的名字:重新修改版本号
> ```
>
> ![image-20210201143939723](https://static.jindll.com/notes/image-20210201143939723.png)

### 2.4 容器的操作

```sh
# 1. 运行容器
# 简单操作 但是外部无法访问
docker run 镜像的标示[镜像名称[:tag]]
# 常用的参数
docker run -d -p 宿主机端口:容器端口 --name 容器名称 镜像的标示[镜像名称[:tag]]
# -d 代表后台运行容器
# -p 宿主机端口:容器端口 为了映射当前Linux的端口和容器的端口
# --name 容器名称 制定容器的名称
```

```sh
# 2. 查看正在运行的容器
docker ps [-qa]
# -a 查看全部容器，包括没有运行的容器
# -q 只查看容器的表识
```

```sh
# 3. 查看容器的日志
docker logs -f 容器ID
# -f 可以滚动查看日志的最后几行
```

```sh
# 4. 进入到容器内部
docker exec -it 容器id bash
# 最后的 bash 也可以换成 /bin/bash ，因为 bash 也是 /bin/bash
```

```sh
# 5. 删除容器(删除容器前，需要先停止容器)
# 5.1 停止指定的容器
docker stop 容器ID
# 5.2 删除指定容器
docker rm 容器ID
# 5.3 删除全部容器
docker rm $(docker ps -qa)
```

```sh
# 6. 启动容器
docker start 容器ID
```

## 三、Docker 应用

让 tomcat 容器去连接 mysql

### 3.1 准备SSM工程

```sh

```

### 3.2 准备MySQL容器

```sh
# 1. 拉取MySQL镜像（run命令运行docker镜像，当镜像不存在，会自动帮我们拉取镜像，所以我们拉取与运行两步合一，直接运行run命令）
# https://hub.daocloud.io/repos/fa51c1d6-9dc2-49d9-91ac-4bbfc24a1bda
docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=wltyxgy1BW daocloud.io/library/mysql:5.7.4
```

### 3.3 准备Tomcat容器

```sh
# 1. 运行tomcat容器
# https://hub.daocloud.io/repos/47f127d0-8f1d-4f91-9647-739cf3146a04
docker run -d -p 8080:8080 --name tomcat daocloud.io/library/tomcat:8.5.15-jre8
# 2. 将宿主机的内容复制到容器内部
docker cp 文件名称 容器ID:容器内部路径
# 例子：将ssm工程复制到容器内部
docker cp ssm fe:/usr/local/tomcat/webapps/
```

### 3.4 数据卷

> 如上，为了部署SSM的工程，需要使用到cp命令将宿主机内的ssm.war文件复制到容器内部。但这样会存在一个问题，当你需要修改项目的内容，频繁部署时，会非常不方便。此时就可以使用数据卷，**数据卷的作用就是将宿主机的一个目录映射到容器内的一个目录中，这样当宿主机目录内的文件发生改变时，容器会同步生效(注意：这里是映射，而不是将宿主机的文件同步到容器)**
>
> 数据卷：将宿主机的一个目录映射到容器的一个目录中

```sh
# 1. 创建数据卷
docker volume create 数据卷名称
# 创建数据卷之后，默认会存放在一个目录下 /var/lib/docker/volumes/数据卷名称/_data
```

```sh
# 2. 查看数据卷的详细信息
docker volume inspect 数据卷名称
```

```sh
# 3. 查看全部数据卷
docker volume ls
```

```sh
# 4. 删除数据卷
docker volume rm 数据卷名称
```

```sh
# 5. 启动数据卷
# 当你映射数据卷时，如果数据卷不存在，docker会帮你自动创建
docker run -v 数据卷名称:容器内部的路径 镜像ID
# 直接指定一个路径作为数据卷的存放位置
docker run -v 路径:容器内部的路径 镜像ID

# 例如：数据卷的启动需要跟随容器启动一起进行
docker run -d -p 8080:8080 --name tomcat -v volume_ssm_tomcat:/usr/local/tomcat/webapps b8
```

## 四、Docker自定义镜像

> 中央仓库上的镜像，也是Docker用户自己上传上去的

```
# 1. 创建一个Dockerfile文件，并且指定自定义镜像信息。
# Dockerfile文件中常用的内容
from: 指定当前自定义镜像依赖的环境
copy: 将相对路径下的内容复制到自定义镜像中
workdir: 声明镜像的默认工作目录
cmd: 需要执行的命令（在workdir下执行的，cmd可以写多个，但只以最后一个为准）

eg：自定义一个tomcat镜像，并将ssm.war部署到tomcat中
form daocloud.io/library/tomcat:8.5.15-jre8
copy ssm.war /usr/local/tomcat/webapps # 意思是将 ssm.war 文件复制到form容器的/usr/local/tomcat/webapps目录中
workdir
cmd
```

```sh
# 2. 将准备好的Dockerfile和相应的文件放在同一个目录内，通过Docker的命令制作镜像
docker build -t 镜像名称[:tag] . # 注意，最后有一个 . 表示当前路径
# 3. 制作好之后，可以 通过 docker images 命令，查看制作的自定义镜像
docker images
# 4. 通过 run 命令，去运行镜像
docker run -d -p 宿主机端口:容器端口 --name 容器名称 镜像的标示[镜像名称[:tag]]
# 5. 通过 docker ps 查看运行起来的容器
docker ps

{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://hub.daocloud.io/",
    "https://reg-mirror.qiniu.com",
    "https://mirror.baidubce.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://htd3lccj.mirror.aliyuncs.com"
  ]
}
```

## 六、Docker-Compose

> 之前运行一个镜像，需要添加大量参数。
>
> 可以通过Docker-Compose编写这些参数。
>
> Docker-Compose 可以帮助我们批量管理容器。
>
> 只需要通过一个docker-compose.yml文件去维护即可。

### 6.1 下载Docker-Compose

```sh
# 1. 去github官网搜索docker-compose，下载1.24.1版本的Docker-Compose
https://github.com/docker/compose/releases/tag/1.24.1

# 2. 将下载好的文件，拖拽到Linux操作系统中

# 3. 需要将DockerCompose文件的名称修改一下，方便操作
mv docker-compose-Linux-x86_64 docker-compose

# 4. 给DockerCompose文件一个可执行权限
chmod 777 docker-compose

# 5. 方便后期操作，配置一个环境变量
# 5.1 将docker-compose文件移动到/usr/local/bin
mv docker-compose /usr/local/bin
# 5.2 修改 /etc/profile 文件，给 /usr/local/bin 配置到 PATH 中
vi /etc/profile

		export PATH=$JAVA_HOME:/usr/local/bin:$PATH

# 5.3 重新加载环境变量
source /etc/profile

# 6. 测试一下
# 在任意目录下输入 docker-compose
```

### 6.2 Docker-Compose 管理MySQL和Tomcat容器

> yml文件以 key: value 方式来指定配置信息
>
> 多个配置信息以换行+锁进的方式来区分
>
> 在docker-compose.yml文件中，锁进不要使用制表符

```yml
version: '3.1'
services:
  mysql: # 服务的名称
    restart: always # 代表只要docker启动，那么这个容器就跟着一起启动
    image: daocloud.io/library/mysql:5.7.4 # 指定镜像路径
    container_name: mysql # 指定容器名称
    ports:
      - 3306:3306 # 指定端口号的映射
    environment: # 指定环境信息
      MYSQL_ROOT_PASSWORD: wltyxgy1BW # 指定MySQL的ROOT用户登录密码
      TZ: Asia/Shanghai # 指定时区
    volumes: # 配置数据卷
      - /opt/docker_mysql_tomcat/mysql_data:/var/lib/mysql # 映射数据卷 宿主机路径:容器路径
  tomcat:
    restart: always # 代表只要docker启动，那么这个容器就跟着一起启动
    image: daocloud.io/library/tomcat:8.5.15-jre8 # 指定镜像路径
    container_name: tomcat # 指定容器名称
    ports:
      - 8080:8080 # 指定端口号的映射
    environment: # 指定环境信息
      TZ: Asia/Shanghai # 指定时区
    volumes: # 配置数据卷
      - /opt/docker_mysql_tomcat/tomcat_webapps:/usr/local/tomcat/webapps # 映射数据卷 宿主机路径:容器路径
      - /opt/docker_mysql_tomcat/tomcat_logs:/usr/local/tomcat/logs
```

### 6.3 使用docker-compose 命令管理容器

> 在使用`docker-compose` 的命令时，会默认在当前目录下查找 **docker-compose.yml** 文件

```shell
# 1. 基于docker-compose命令，启动管理的容器
docker-compose up -d
```

```shell
# 2. 关闭并删除容器
docker-compose down
```

```shell
# 3. 启动｜停止｜重启由docker-compose维护的容器
docker-compose start｜stop｜restart
```

```shell
# 4. 查看由docker-compose管理的容器
docker-compose ps
```

```shell
# 5. 查看日志
docker-compose logs -f
```

