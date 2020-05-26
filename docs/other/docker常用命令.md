> 以“]#”开头的都是命令行的命令，灰色背景的都敲完命令后的显示，
>
> \#### 都是注释

##镜像命令

### 1. 在官方镜像库中查找镜像

```shell
]# docker  search  docker.io/busybox
```

### 2. 拉取镜像

```shell
]# docker pull 镜像名
```

> Eg: `]# docker pull docker.io/busybox`

### 3. 上传镜像

```shell
]# docker  push  docker.io/busybox
```

### 4. 查看本地镜像

```shell
]# docker images

REPOSITORY        TAG              IMAGE ID         CREATED             SIZE

docker.io/busybox    latest         d8233ab899d4        10 days ago         1.199 MB
```

### 5.导出busybox镜像为busybox.tar

```shell
]# docker  save  docker.io/busybox:latest  -o  busybox.tar

]# ls

busybox.tar 
```


### 6.导入镜像

```shell
]# docker load -i nginx.tar

3c816b4ead84: Loading layer 58.47 MB/58.47 MB

787822cf1b17: Loading layer 54.44 MB/54.6MB

89decbdf7fb7: Loading layer 3.584 kB/3.584 kB

Loaded image: docker.io/nginx:latest/3.584 kB 

]# docker images

REPOSITORY   TAG    IMAGE ID                    CREATED                  SIZE

docker.io/nginx latest 42b4762643dc 4 weeks ago 109.2 M e1ddd7948a1c 4 weeks ago 1.163 MB
```


### 7.删除镜像



```shell
]# docker rmi docker.io/nginx

Untagged: docker.io/nginx:latest

Deleted: sha256:42b4762643dcc9bf492b08064b55fef64942f055f0da91289a8abf93c6d6b43c

Deleted: sha256:e0e55dd2303b3e3ec852acae267d1f8a3eea27a22c64a5829304ecee4d3f559c

Deleted: sha256:4062cf272cdd99e83b1c21f712e5e1359c91ecf92925e56c62133c3324b84e45 

Deleted: sha256:3c816b4ead84066ec2cadec2b943993aaacc3fe35fcd77ada3d09dc4f3937313
```




### 8.启动centos镜像生成一个容器

```shell
]# docker  run  -it  docker.io/centos   /bin/bash

[root@7a652fc72a9f /]# ls /                   ####已经进入到容器中

anaconda-post.log bin dev etc home lib lib64 media mnt opt proc root run sbin srv sys tmp usr var

[root@7a652fc72a9f]# exit                     ####退出容器

exit
```


### 9.启动一个后台的容器

```shell
]# docker run -d docker.io/nginx                 ####启动nginx的镜像
```


### 10.查看后台运行的容器

```shell
]# docker  ps  

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

81458156f6e8 docker.io/nginx "nginx -g 'daemon off" 9 seconds ago Up 8 seconds 80/tcp pedantic_goldberg
```


### 11.查看运行中的容器并且只显示容器ID

```shell
]# docker  ps  -q

81458156f6e8
```


### 12.显示所有的容器,包括没有启动的

```shell
]# docker ps -a
```


### 13.显示所有的容器ID

```shell
]# docker  ps  -qa

81458156f6e8

3656f1978967
```


### 14.查看centos镜像历史（制作过程）

```shell
]# docker history docker.io/centos
```




### 15.删除镜像，启动容器时删除镜像会失败，先删除容器,再删除镜像

```shell
格式：docker rmi 镜像名

]# docker   rmi    nginx                   ####nginx为镜像名

Error response from daemon: conflict: unable to remove repository reference "nginx" (must force) - container 81458156f6e8 is using its referenced image 42b4762643dc  

​      \####删除时报错

]# docker   stop   81                ####81为nginx容器的id

81

]# docker   rm  81                           ####删除容器

81

]# docker rmi docker.io/nginx //删除nginx镜像

Untagged: docker.io/nginx:latest

Deleted: sha256:42b4762643dcc9bf492b08064b55fef64942f055f0da91289a8abf93c6d6b43c

Deleted: sha256:e0e55dd2303b3e3ec852acae267d1f8a3eea27a22c64a5829304ecee4d3f559c

Deleted: sha256:4062cf272cdd99e83b1c21f712e5e1359c91ecf92925e56c62133c3324b84e45 

Deleted: sha256:3c816b4ead84066ec2cadec2b943993aaacc3fe35fcd77ada3d09dc4f3937313
```


### 16.修改镜像的名称和标签,默认标签为latest

```shell
]# docker  tag  docker.io/centos:latest   docker.io/cen:v1

]# docker images

REPOSITORY TAG IMAGE ID CREATED SIZE

docker.io/centos   latest  42b4762643dc  4 weeks ago   109.2 MB

docker.io/cen       v1   42b4762643dc  4 weeks ago   109.2 MB
```

## 容器命令



1.关闭容器

]#docker stop 容器ID

]# docker  stop  0f                     ####0f为容器ID

0f



2.启动容器

]# docker  start  0f

0f



3.重启容器

]# docker restart 0f

0f



4.删除容器

运行中删除不掉，先关闭容器





]# docker  rm  0f                      ####删除失败

Error response from daemon: You cannot remove a running container 0f63706692e15134a8f07655a992771b312b8eb01554fc37e1a39b03b28dd05c. Stop the container before attempting removal or use -f

]# docker   stop   0f                    ####关闭容器

0f

]# docker  rm   0f                       ####删除成功

0f



5.连接容器attach或exec                ！！！！强烈推荐使用exec

]# docker  attach  0f

]# docker  ps                          ####退出容器时容器会关闭

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

]# docker  exec  -it  0f  /bin/bash

]# docker ps                           ####退出容器时容器不会关闭

CONTAINER ID   IMAGE          COMMAND   CREATED      STATUS     PORTS NAMES

0b3c50284a1c  docker.io/centos  "/bin/bash"  15 minutes ago  Up 15 minutes  tiny_lamarr







**使用Dockerfile生成镜像**

**
**

以创建一个web服务容器为例：

**
**

]# mkdir  bulid                        ####建立工作目录

]# cd bulid                            ####进入

]# touch  Dockerfile                    ####创建一个Dockerfile文件且第一个字母要大写，这个文件是核心

]# cp /etc/yum.repos.d/local.repo  ./      ####把yum源复制一份，这一步是给容器配yum源，让容器可以装web服务

]# vi  Dockerfile        ####编辑Dockerfile文件

FROM  docker.io/myos:latest            ####以docker.io/myos:latest为基础镜像，创建一个自己的镜像

RUN yum -y install httpd                 ####在容器里安装web服务

ENV EnvironmentFile=/etc/sysconfig/httpd  ####运行环境

WORKDIR /var/www/html/              ####定义容器默认工作目录

ADD index.html index.html              

EXPOSE 80                //设置开放端口号

EXPOST 443

CMD ["/usr/sbin/httpd", "-DFOREGROUND"]

]# docker  build  -t  docker.io/myos:http  .   <-----有个点    ####生成镜像的命令，这里有个点，很重要，它的意思是代表使用当前目录下的Dockerfile文件生成镜像

[root@docker1 bulid]# docker   run   -d    docker.io/myos:http       启动我们自己的镜 





像

d9a5402709b26b42cd304c77be442559a5329dc784ec4f6c90e4abac1c88e206

[root@docker1 bulid]# docker inspect d9

[root@docker1 bulid]# curl 172.17.0.7

test













**以我们做的jar包为例生成镜像**

   



有三要素：jar包      Dockerfile文件   docker-compose.yml   文件

内容分别如下：

**<1>Dockerfile文件**

]#cat  Dockerfile

FROM byh-registry-pro:5000/oraclejdk8:v1        ####以oraclejdk8:v1为基础镜像来制作一个我们的镜像

VOLUME /tmp                               ####挂载的目录

ADD byh-permissions-server-*.jar app.jar         ####容器内添加的文件

RUN sh -c 'touch /app.jar'                      ####运行的命令

RUN echo "Asia/Shanghai" > /etc/timezone       

ENV JAVA_OPTS="-Duser.timezone=GMT+08 -Dfile.encoding=UTF-8"     ####环境变量

ENTRYPOINT ["sh","-c","java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ]

**<2>docker-compose.yml文件**

]#cat docker-compose.yml

version: '2'

services:

  byh-user-center:

​    image: byh-registry-pro:5000/byh-permissions-server:s1.0.0      ####要使用的镜像

​    restart: always

​    volumes:                                                ####挂载的目录

​      \- /data/log:/data/log

​      \- /etc/localtime:/etc/localtime

​    extra_hosts:                                             ####添加主机别名

​      configserver: 172.17.31.83





​      discover: 172.17.31.79

​      rabbitmq: 58.216.47.95

​      redis-server: 58.216.47.95

​      dbserver: 58.216.47.95

​    environment:                                           ####环境变量

​      \#- spring.cloud.config.profile=pro

​      \#- spring.cloud.config.enabled=false

​      \#- spring.cloud.config.label=ncefy

​      \- user.timezone=GMT+08

​      \- spring.profiles.active=op

​    ports:                                                ####暴露的端口

​      \- 8699:8699

​    network_mode: "host"



**<3>   jar包是你的强项，我就不懂了**



一．制作镜像

使用Dockerfile生成镜像

]# docker  build  -t  byh-registry-pro:5000/byh-permissions-server:s1.0.0   .   <---这有个点  ####使用Dockerfile生成镜像，并起名为 byh-registry-pro:5000/byh-permissions-server:s1.0.0

使用 ”docker images” 可以看到已经生成的镜像



二．使用docker-compose.yml启动容器

]# docker-compose  up  -d              ####  “-d”是后台运行,此时容器已经启动    

用“docker  ps”就可以看到

