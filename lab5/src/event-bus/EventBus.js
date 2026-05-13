class EventBus {

  constructor() {

    this.listeners = {};

  }

  subscribe(event, listener) {

    if (!this.listeners[event]) {

      this.listeners[event] = [];

    }

    this.listeners[event]
      .push(listener);

  }

  publish(event, data) {

    const listeners =
      this.listeners[event] || [];

    listeners.forEach(listener =>
      listener(data)
    );

  }

}

module.exports = EventBus;