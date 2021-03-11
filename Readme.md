ScreenStatus.js（发音 /skriːn steɪtəs/ ）插件用于检测用户当前标签页显示状态，他可以检测到用户当前标签页是否显示，以此得知用户是否离开当前页面。

### 浏览器兼容性

ScreenStatus.js 支持所有 符合 ES5 规范 的浏览器（不支持IE9及以下版本） 。

##### ![1615196788758.png](https://cdn.nlark.com/yuque/0/2021/png/2980524/1615360015739-b9e99aa2-d0bc-49f8-8b7b-2b1b138f71c1.png#align=left&display=inline&height=307&margin=%5Bobject%20Object%5D&name=1615196788758.png&originHeight=307&originWidth=1416&size=54065&status=done&style=none&width=1416)

### 快速上手

这里展示一个简单的使用案例。

#### 安装

下载后打包出的文件为 dist 文件夹中的 listenScreen.js。

```javascript
npm run build
```

#### 引入使用

```javascript
<script src="./listenScreen.js"></script>
<script>
    let Screen = new ScreenStatus(handlerError);
    function fn1() {
        document.title = '页面不可见';
        console.log('123')
    }
     function fn2() {
        document.title = '页面可见';
        console.log('结束')
    }
    function handlerError() {
        console.log('error')
    }
	//页面可见时触发fn1，返回一个移除本方法的函数
    let deleteFn1 = Screen.onShow(fn1)
    //页面不可见触发fn2
    Screen.onBlur(fn2)
	//移除fn1
    deleteFn1()
	//移除所有方法，并取消监听
    Screen.destroy()
</script>
```

### 自定义配置

| API        | 参数 | 类型     | 说明                                                         | 是否必传 | 默认值 | 返回值           |
| ---------- | ---- | -------- | ------------------------------------------------------------ | -------- | ------ | ---------------- |
| onShow(fn) | fn   | function | 接受一个函数参数，可多次调用，添加多个方法，会在页面可见时调用所有方法 | 必传     | 无     | 销毁该方法的回调 |
| onBlur(fn) | fn   | function | 接受一个函数参数，可多次调用，添加多个方法，会在页面不可见时调用所有方法 | 必传     | 无     | 销毁该方法的回调 |
| delete     | fn   | function | 销毁当前方法                                                 |          | `无`   | 无               |
| destroy()  | fn   | function | 销毁所有方法，并且解除监听事件                               |          |        |                  |



### 添加页面展示时执行函数

```javascript
import from 'ScreenStatus'
let Screen = new ScreenStatus();
  function fn1() {
    document.title = '页面可见';
  }
Screen.onShow(fn1)
```

### 添加页面隐藏时执行函数

```javascript
import from 'ScreenStatus'
let Screen = new ScreenStatus();
  function fn1() {
    document.title = '页面不可见';
  }
Screen.onBlur(fn1)
```

### 添加多个事件

```javascript
import from 'ScreenStatus'
  let Screen = new ScreenStatus();
  function fn1() {
    document.title = '页面可见';
    console.log('123')
  }
  function fn2() {
    console.log('456')
  }
  function fn3() {
    console.log('789')
  }
  function fn4() {
    document.title = '页面不可见';
    console.log('结束')
  }
  Screen.onShow(fn1)
  Screen.onShow(fn2)
  Screen.onBlur(fn3)
  Screen.onBlur(fn4)
```

### 移除指定事件

```javascript
import from 'ScreenStatus'
let Screen = new ScreenStatus();
  function fn1() {
    document.title = '页面不可见';
  }
let deleteFn1 =Screen.onBlur(fn1)
deleteFn1()
```

### 移除全部事件

```javascript
import from 'ScreenStatus'
let Screen = new ScreenStatus();
Screen.destroy()
```

### 添加错误处理函数

```javascript
import from 'ScreenStatus'
 let Screen = new ScreenStatus(handlerError);
 function handlerError() {
    console.log('error')
}
```

以上是 ScreenStatus 的使用方法。

