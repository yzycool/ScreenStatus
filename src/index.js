export class ScreenStatus {
    constructor(options = {}) {
      this.init(options)
    }
    init(options) {
      this.listenScreen()
      this.events = { blur: [], focus: [] }
      this.handlerError = options.handlerError || console.error;
    }
    listenScreen() {
      this.blurNotification = this.creatNotification('blur')
      this.focusNotification =  this.creatNotification('focus')
      this.listenChange = ()=>{
        if (document.visibilityState === 'hidden') {
             this.blurNotification()
        }
        if (document.visibilityState === 'visible') {
        this.focusNotification()
        }
       }
        document.addEventListener('visibilitychange', this.listenChange)
    }
    creatNotification = (type) => {
      if (type || this.events[type]){
       return()=>{
        this.events[type].forEach(fn => {
          try {
            fn()
          } catch(error) {
            this.handlerError(error)
          }
        })
      }
    }
    }
    creatEvents(type, handler) {
      if (!handler || typeof handler !== 'function') return
      this.events[type].push(handler)
      return () => {
        removeEvents(type, handler)
      }
    }
    removeEvents(type, handler) {
      if (!handler || typeof handler !== 'function') return
      handler = this.events[type]
      _index = handler.indexOf(handler)
      if(_index !== -1){
            handler.splice(_index,1) 
      }
    }
    onBlur(handler) {
      return this.creatEvents('blur', handler)
    }
    onShow(handler) {
      return this.creatEvents('focus', handler)
    }
    destroy(){
      this.events = null
      window.removeEventListener('visibilitychange', this.showHandler, false)
    }
  }

