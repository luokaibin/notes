## 1

```html
<body>
  <custom-start />
  <script src="./index.js"></script>
</body>
```

```js
class CustomStart extends HTMLElement {
  constructor() {
    super();
    this.render()
  }
  render() {
    const shadow = this.attachShadow({mode: 'open'});
    const spanDow = document.createElement('span');
    spanDow.textContent = 'Hi! Custom Start'
    shadow.append(spanDow)
  }
}
customElements.define('custom-start', CustomStart);
```

- [**`customElements.define`**](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements) 定义组件

- [**`this.attachShadow`**](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow) mode 可以取 `open` 或 `closed` 

  > <img src="https://static.jindll.com/notes/image-20220321155413237.png" alt="image-20220321155413237" style="zoom:50%;" />
