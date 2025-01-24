---
updated: 2024/11/17 11:50:36
date: 2024/11/17 11:50:36
categories: 
  - linux
title: linux du 命令
post_title: linux du 命令
comments: true
description: 一、du命令简介du（是 disk usage 的简称）用来显示目录或文件的大小，查找文件和目录的磁盘使用情况的命令。du 命令在与各种选项一起使用时能以多种格式提供结果。二、使用方法代码语言：javascript复制补充说明：du会显示指定的目录或文件所占用的磁盘空间。参数：代码语言：javascript
---
一、du命令简介

du（是 disk usage 的简称）用来显示目录或文件的大小，查找文件和目录的磁盘使用情况的命令。du 命令在与各种选项一起使用时能以多种格式提供结果。

二、使用方法

代码语言：javascript

复制

```javascript
语法：du [-abcDhHklmsSx] [-L <符号连接>][-X <文件>][--block-size][--exclude=<目录或文件>] [--max-depth=<目录层数>][--help][--version][目录或文件]
```

补充说明：du会显示指定的目录或文件所占用的磁盘空间。

参数：

代码语言：javascript

复制

```javascript
-a或-all  显示目录中个别文件的大小。
-b或-bytes  显示目录或文件大小时，以byte为单位。
-c或--total   除了显示个别目录或文件的大小外，同时也显示所有目录或文件的总和。
-D或--dereference-args   显示指定符号连接的源文件大小。
-h或--human-readable  以K，M，G为单位，提高信息的可读性。
-H或--si   与-h参数相同，但是K，M，G是以1000为换算单位。
-k或--kilobytes  以1024  bytes为单位。
-l或--count-links   重复计算硬件连接的文件。
-L<符号连接>或--dereference<符号连接>   显示选项中所指定符号连接的源文件大小。
-m或--megabytes  以1MB为单位。
-s或--summarize   仅显示总计。
-S或--separate-dirs  显示个别目录的大小时，并不含其子目录的大小。
-x或--one-file-xystem   以一开始处理时的文件系统为准，若遇上其它不同的文件系统目录则略过。
-X<文件>或--exclude-from=<文件>   在<文件>指定目录或文件。
--exclude=<目录或文件>   略过指定的目录或文件。
--max-depth=<目录层数>  超过指定层数的目录后，予以忽略。
--help   显示帮助。
--version  显示版本信息。
```

三、实例操作：

1、查看目录下所有文件的大小并按照大小排序

[linuxmi@linux:~/Linux迷] $ du -sh * | sort -rh

![img](https://static.jiabanmoyu.com/notes/5e9bccfb7f4e5351caadfaa5bd9b6595.png)

2、统计当前目录的大小，以直观方式展现

[linuxmi@linux:~/Linux迷] $ du -sh

![img](https://static.jiabanmoyu.com/notes/2ff081446890aaeeae5ea18ddc984ebd.png)

查看当前目录总共占的容量，而不单独列出各子项占用的容量。

3、查看当前目录下所有一级子目录文件夹大小 并排序

代码语言：javascript

复制

```javascript
[linuxmi@linux:~] $ sudo du -h --max-depth=1 |sort
```

![img](https://static.jiabanmoyu.com/notes/9cd5362ead55f6cb42af84d458654076.png)

4、以人性化的方式显示文件大小

代码语言：javascript

复制

```javascript
[linuxmi@linux:~/Linux] $ du -h Debian.iso
```

![img](https://static.jiabanmoyu.com/notes/cd032f0a9f985df0cbf399d083268624.png)

5、查看当前目录下一级子文件和子目录占用的磁盘容量

代码语言：javascript

复制

```javascript
[linuxmi@linux:~/Linux] $ du -lh --max-depth=1
```

![img](https://static.jiabanmoyu.com/notes/12a5bf8450c2e9362d4751be209d92d7.png)

当--max-depth设定为0时, 只显示当前文件夹总大小，可见，--max-depth=0的作用，相当于-s

6、递归查询文件大小

 -0, --null      用NUL结束每个输出行，而不是换行

 -a, --all      递归式写计数的所有文件，不只是目录

代码语言：javascript

复制

```javascript
[linuxmi@linux:~/Linux] $ du -a
```

可见如果只是du则递归查询当前所有目录的大小，如果指定-a，则也也递归查询所有文件大小

如下图：

![img](https://static.jiabanmoyu.com/notes/4b164cc3cb793e1da23b7c28c9d05a00.png)