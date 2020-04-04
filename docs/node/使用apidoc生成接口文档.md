---
title: 使用apidoc生成接口文档
description: 
lang: zh_CN
---



官方文档： [https://apidocjs.com/](https://apidocjs.com/)

简书资料： [https://www.jianshu.com/p/9353d5cc1ef8](https://www.jianshu.com/p/9353d5cc1ef8)

## 安装

```
npm install apidoc
```

在项目中新建 `apidoc.json` 文件，也可以放到 `package.json` 文件中

```js
{
  "name": "example",
  "version": "0.1.0",
  "description": "apiDoc basic example",
  "apidoc": {
    "title": "Custom apiDoc browser title",
    "url" : "https://api.github.com/v1"
  }
}
```

## 配置项说明

|参数 |描述|
|----|----|
|name |工程名称;如果`apidoc.json`文件中没有配置该参数，`apidoc`会尝试从`pakcage.json`文件中读取|
|version |版本;如果`apidoc.json`文件中没有配置该参数，`apidoc`会尝试从`pakcage.json`文件中读取|
|description |工程描述;如果`apidoc.json`文件中没有配置该参数，`apidoc`会尝试从`pakcage.json`文件中读取|
|title| 浏览器标题|
|url| api路径前缀;例如:`https://api.github.com/v1`|
|sampleUrl| 如果设置了该参数，那么在文档中便可以看到用于测试接口的一个表单(详情可以查看参数@apiSampleReques) |
|header.title| 页眉导航标题 |
|header.filename |页眉文件名(markdown)  |
|footer.title| 页脚导航标题  |
|footer.filename| 页脚文件名(markdown) |
|order| 接口名称或接口组名称的排序列表; 如果未定义，那么所有名称会自动排序<br />"order":[<br/>   "Error",<br/>   "Define",<br/>   "PostTitleAndError",<br/>   "PostError"<br/>] |

## 注释标准

看简书说明

## 启动

```
npx apidoc -i ./app/controller/ -o app/public/docs
```

