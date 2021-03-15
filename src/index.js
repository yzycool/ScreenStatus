export class ScreenStatus {
  constructor(options = {}) {
    this.init(options)
  }
  init (options) {
    this.listenScreen()
    this.events = { blur: [], focus: [], exitFull: [], enterFull: [] }
    this.handlerError = options.handlerError || console.error;
    this.blurNotification = this.creatNotification('blur')
    this.focusNotification = this.creatNotification('focus')
    this.exitFullNotify = this.creatNotification('exitFull')
    this.enterFullNotify = this.creatNotification('enterFull')
    this.createEvent()
  }

  //事件API
  createEvent () {
    const events = ['blur', 'focus', 'exitFull', 'enterFull']
    const onEvents = ['onBlur', 'onShow', 'exitFullScreenCallback', 'enterFullScreenCallback']
    onEvents.forEach((event, index) => {
      this[event] = (handler) => {
        return this.creatEvents(events[index], handler)
      }
    })
  }
  //移除当前事件
  removeEvents (type, handler) {
    if (!handler || typeof handler !== 'function') return
    let handlerAll = this.events[type]
    let _index = handlerAll.indexOf(handler)
    if (_index !== -1) {
      console.log(this.events[type])
      this.events[type].splice(_index, 1)
    }
  }
  //进入全屏
  requestFullScreen () {
    var de = document.documentElement;
    if (de.requestFullscreen) {
      de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
      de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
      de.webkitRequestFullScreen();
    }
  }
  //退出全屏
  exitFullscreen () {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else {
      document.msExitFullscreen();
    }
  }
  //判断当前是否全屏
  isFullScreen () {
    if (document.mozFullScreen) {
      return true;
    } else if (document.webkitIsFullScreen) {
      return true;
    } else if (document.msFullscreenElement) {
      return true;
    } else if (window.fullScreen) {
      return true;
    }
    return false;
  }
  listenScreen () {
    document.addEventListener('visibilitychange', this.listenChange)
    document.addEventListener('fullscreenchange', this.listenChangeFull)
  }
  listenChange = () => {
    if (document.visibilityState === 'hidden') {
      this.blurNotification()
    }
    if (document.visibilityState === 'visible') {
      this.focusNotification()
    }
  }
  listenChangeFull = () => {
    if (document.fullscreenElement !== null) {
      this.enterFullNotify()
    } else {
      this.exitFullNotify()
    }
  }
  destroy () {
    this.events = null
    document.removeEventListener('visibilitychange', this.listenChange)
    document.removeEventListener('fullscreenchange', this.listenChangeFull)
  }
  creatEvents (type, handler) {
    console.log(type)
    if (!handler || typeof handler !== 'function') return
    this.events[type].push(handler)
    return () => {
      this.removeEvents(type, handler)
    }
  }
  creatNotification = (type) => {
    if (type || this.events[type]) {
      return () => {
        this.events[type].forEach(fn => {
          try {
            fn()
          } catch (error) {
            this.handlerError(error)
          }
        })
      }
    }
  }
}

