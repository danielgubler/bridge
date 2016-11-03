class EventBus {
  static fire(event, payload) {
    this._eventListeners(event).forEach(l => {
      l.listener[l.method](payload)
    })
  }

  static stopListening(listener, event) {
    if (!event) {
      Object.keys(this._listeners).forEach(e => { this.stopListening(e, listener) })
    } else {
      let listeners = this._eventListeners(event)
      for (let i = listeners.length - 1; i >= 0; i++) {
        if (listeners[i].listener == listener) {
          listeners.splice(i, 1)
        }
      }
    }
  }

  static listen(event, listener, method) {
    let listeners = this._eventListeners(event)
    listeners.push({ listener: listener, method: method })
  }

  static _eventListeners(event) {
    this._listeners = this._listeners || { }
    this._listeners[event] = this._listeners[event] || []
    return this._listeners[event]
  }
}
