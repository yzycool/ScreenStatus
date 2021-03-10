##### 介绍

ScreenStatus（发音 /skriːn steɪtəs/ ）是用于检测用户当前标签页显示状态的插件，他可以检测到用户当前标签页是否显示，以此得知用户是否离开当前页面。

##### 浏览器兼容性

ScreenStatus 支持所有 [符合ES5的] (https://kangax.github.io/compat-table/es5/)浏览器（不支持IE9及以下版本） 

##### ![1615196788758](C:%5CUsers%5CAdministrator%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1615196788758.png)

##### 例子

##### 添加页面展示时执行函数

```js
import from 'ScreenStatus'
let Screen = new ScreenStatus();
  function fn1() {
    document.title = '页面可见';
  }
    Screen.onShow(fn1)
```

##### 添加页面隐藏时执行函数

```js
import from 'ScreenStatus'
let Screen = new ScreenStatus();
  function fn1() {
    document.title = '页面不可见';
  }
    Screen.onBlur(fn1)
```

##### 添加多个事件

```js
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

##### 移除指定事件

```js
import from 'ScreenStatus'
let Screen = new ScreenStatus();
  function fn1() {
    document.title = '页面不可见';
  }
    Screen.onBlur(fn1)
```

##### 移除全部事件

```js
import from 'ScreenStatus'
let Screen = new ScreenStatus();
    Screen.destroy()
```

##### 添加错误处理函数

```js
import from 'ScreenStatus'
 let Screen = new ScreenStatus(handlerError);
 function handlerError() {
    console.log('error')
  }
```

以上是 ScreenStatus 的使用方法。

