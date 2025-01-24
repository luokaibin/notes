---
updated: 2024/07/18 19:14:05
date: 2024/07/18 19:14:05
categories: 
  - web
title: SVG绘图指令
post_title: SVG绘图指令
comments: true
description: SVG 坐标系stroke 描边颜色stroke-width 描边宽度fill 填充色M指令表达 Move to 的意思，用来描述起点，想象成一个人握着画笔，将画笔移动到纸上的某一个位置M 指令、关键字x X轴坐标y Y轴坐标L指令L 指令、关键字x X轴坐标。y Y轴坐标。与M指令配合，M指令描述了起点，L指令表示要绘制直线，L指令的坐标表示这条直线的终点
---
## SVG 坐标系

![image-20230814165101476](https://static.jiabanmoyu.com/notes/image-20230814165101476.png)

## stroke 描边颜色

## stroke-width 描边宽度

## fill 填充色

## M指令

表达 **Move to** 的意思，用来描述起点，想象成一个人握着画笔，将画笔移动到纸上的某一个位置

```
M x y
```

- **M** 指令、关键字
- **x** X轴坐标
- **y** Y轴坐标

## L指令

```
L x y
```

- **L** 指令、关键字
- **x** X轴坐标。
- **y** Y轴坐标。

> 与M指令配合，M指令描述了起点，L指令表示要绘制直线，L指令的坐标表示这条直线的终点

绘制直线

```html
<svg width="100" height="100">
	<path d="M0 10L100 50" stroke="#000" stroke-width="10"></path>
</svg>
```



<svg width="100" height="100">
	<path d="M10 10L100 50" stroke="#000" stroke-width="10"></path>
</svg>

### 利用L指令绘制一个三角形

```html
<svg width="100" height="100">
	<path d="M50 10L90 80L10 90L50 10" fill="#000"></path>
</svg>
```



<svg width="100" height="100">
	<path d="M50 10L90 80L10 90L50 10" fill="#000"></path>
</svg>



## A指令

画弧形

![image-20230814181912686](https://static.jiabanmoyu.com/notes/image-20230814181912686.png)

```
A rx ry x-axis-rotation large-arc-flag sweep-flag x y
```

- **A** 指令、关键字
- **rx** 这个弧的X轴半径
- **ry** 这个弧的Y轴半径
- **x-axis-rotation** 是椭圆相对于坐标系的旋转角度
- **large-arc-flag** 取值为【0】或【1】大弧(1) 小弧(0) 
- **sweep-flag** 是标记向顺时针(1)还是逆时针(0)方向绘制。 
- **x** X轴坐标
- **y** Y轴坐标

### 测试 large-arc-flag 大小弧 和 sweep-flag 绘制方向

**首先弧是圆或椭圆上的一段，那圆上两点之间肯定存在两段弧，大的弧既为大弧，小的既为小弧，如下：**

- 画布宽为400，高为210
- X轴半径为150 Y轴半径为70
- 旋转角度为0

- 起点为(50,120)终点为(210,30)

- 其中红色短为小弧，绘制方向为顺时针

- 蓝色段为大弧，绘制方向为逆时针

```html
<svg width="400" height="210" style="background: #000">
	<path d="M50 120A150 70 0 0 1 210 30" stroke="#ec2c64" stroke-width="5"></path>
	<path d="M50 120A150 70 0 1 0 210 30" stroke="#2177b8" stroke-width="5"></path>
</svg>
```



<svg width="400" height="210" style="background: #000">
  <text x="0" y="122" fill="#fff">(50,120)</text>
  <text x="190" y="20" fill="#fff">(210,30)</text>
	<path d="M30 80A150 90 0 0 1 150 20L140 15" stroke="#ec2c64" stroke-width="2"></path>
	<path d="M70 160A130 70 0 1 0 350 50L353 60" stroke="#2177b8" stroke-width="2"></path>
	<path d="M50 120A150 70 0 0 1 210 30" stroke="#ec2c64" stroke-width="5"></path>
	<path d="M50 120A150 70 0 1 0 210 30" stroke="#2177b8" stroke-width="5"></path>
</svg>

## 测试 x-axis-rotation 旋转

还是上面实例的椭圆，我们旋转**【-15】**度，即逆时针转了15度，如下

```html
<svg width="400" height="210" style="background: #000">
	<path d="M50 120A150 70 -15 0 1 210 30" stroke="#ec2c64" stroke-width="5"></path>
	<path d="M50 120A150 70 -15 1 0 210 30" stroke="#2177b8" stroke-width="5"></path>
</svg>
```



<svg width="400" height="210" style="background: #000">
  <text x="0" y="122" fill="#fff">(50,120)</text>
  <text x="190" y="20" fill="#fff">(210,30)</text>
	<path d="M50 120A150 70 -15 0 1 210 30" stroke="#ec2c64" stroke-width="5"></path>
	<path d="M50 120A150 70 -15 1 0 210 30" stroke="#2177b8" stroke-width="5"></path>
</svg>
## H指令和V指令

```
M0 0H10
```

- H 绘制水平线段 eg: 上面的例子中，即从(0,0)坐标开始绘制一条水平线段，**（水平线段，即Y轴坐标不变，仅X轴坐标移动）**，绘制到(10,0)位置

```
M0 0V10
```

H 绘制垂直线段 eg: 上面的例子中，即从(0,0)坐标开始绘制一条垂直线段，**（垂直线段，即X轴坐标不变，仅Y轴坐标移动）**，绘制到(0,10)位置

<svg width="700" height="300" style="background: #000">
  <path d="M200 10H240V290H200V10" stroke="#FFD600"/>
</svg>
