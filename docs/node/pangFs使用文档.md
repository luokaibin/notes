---
updated: 2021/11/06 17:37:25
date: 2021/11/06 17:37:25
categories: 
  - node
title: pangFs使用文档
post_title: pangFs使用文档
comments: true
description: fs 常用操作工具库安装使用文档方法入参出参说明getCurrPath-当前路径获取当前CMD命令执行路径copyDirOrFile- src  string 要复制的源文件或者原目录。基于当前项目的相对路径，不需要传入完整路径。- desc  string 要复制到的一个目标目录，必须是一个存在的目录，必须是目录，路径是基于当前项目的相对路径，不需要传入完整路径。
---

fs 常用操作工具库

## 安装

```
npm install pang-fs
```

## 使用

```
const pangFs = require('pang-fs');

pangFs.getCurrPath()
```

## 文档

| 方法            | 入参                                                         | 出参                                | 说明                        |
| --------------- | ------------------------------------------------------------ | ----------------------------------- | --------------------------- |
| getCurrPath     | -                                                            | 当前路径                            | 获取当前CMD命令执行路径     |
| copyDirOrFile   | - src: string 要复制的源文件或者原目录。基于当前项目的相对路径，不需要传入完整路径。<br />- desc: string 要复制到的一个目标目录，必须是一个存在的目录，必须是目录，路径是基于当前项目的相对路径，不需要传入完整路径。<br />- updateFileContent?: (content: Buffer, filePath: string, fileName: string) => Buffer 在对文件进行复制时，可以传入updateFileContent来修改文件内容，updateFileContent 是一个方法 接收三个参数 content 类型 Buffer，为文件内容 filePath 为文件路径 fileName 为文件名，修改之后需要返回修改后的内容，类型为 Buffer | 成功后返回 true ，失败会 throw 错误 | 复制文件或目录              |
| delDirOrFile    | - path: string 要删除的目录或文件，如果删除的是目录，会递归删除这个目录下的所有子目录和文件。基于当前项目的相对路径，不需要传入完整路径。<br />- isCurrDir: boolean 如果要删除的对象是文件，这个参数会被忽略。如果传入的是一个目录，例如：a/b/c/d ，是否删除 d 本身，默认 true | 删除成功返回 true                   | 删除目录或文件              |
| isDirExists     | - path: string 要校验的路径。基于当前项目的相对路径，不需要传入完整路径。 | 存在返回 true；不存在返回 false     | 判断路径是否存在            |
| isDirOrFile     | - path: string 要校验的路径。基于当前项目的相对路径，不需要传入完整路径。 | 目录返回 directory；文件返回 file   | 判断路径是一个文件还是目录  |
| mkdir           | - path: string 要创建的目录；可以传入多级目录，会递归创建，如果目录已存在，会直接返回成功。基于当前项目的相对路径，不需要传入完整路径。 | 创建成功会返回true                  | 创建目录                    |
| readDir         | - path: string 要读取的目录；基于当前项目的相对路径，不需要传入完整路径。<br />- type?: list\|file\|directory\|detailed 要获取的类型；list 由目录名和文件名组成的 Array；file 由文件名组成的 Array；directory 由目录名组成的 Array；detailed 由目录和文件详细信息组成的 Array，包含类型是文件还是目录、name、size（单位是字节）、birthtime 创建时间、mtime 修改时间、atime 访问时间 | 包含目录内容的列表                  | 读取目录                    |
| readFile        | - path: string 要读取的文件                                  | 返回文本内容                        | 读取 utf-8 编码的文本文件   |
| readFileStream  | - path: string 要读取的文件                                  | 返回 buffer                         | 读取文件流                  |
| writeFile       | - path: string 要写入的文件路径，如果路径不存在，会新建目录和文件<br />- text: string 要写入的文本内容 | 写入成功 返回 true                  | 以 utf-8 编码向文件写入内容 |
| writeFileStream | - path: string 要读取的文件路径，如果路径不存在，会新建目录和文件<br />- content: string 要写入的内容 buffer | 写入成功 返回 true                  | 将 buffer 写入文件          |

