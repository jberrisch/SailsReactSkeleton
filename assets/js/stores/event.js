/**
 * Modules
 *
 */

var MapStore = require('flux/utils').MapStore;


/**
 * Class
 *
 */

class EventStore extends MapStore {
  constructor(dispatcher, channel, socket) {
    super(dispatcher);

    this.dispatcher = dispatcher;
    this.channel = channel;
    this.socket = socket;
    this.url = '/' + channel;

    this.events = [];

    this.connect();
  }

  emit(event) {
    this.__emitter.emit(event);
  }

  connect() {
    this.socket.on(this.channel, msg => {
      if (msg.verb === 'created' ||
          msg.verb === 'destroyed') {

        return this.fetch();
      }

      this.dispatcher.dispatch({
        actionType: 'event-modified',
        payload: msg
      });
    });
  }

  reduce(state, action) {
    if (!action || !action.actionType) {
      return state;
    }

    switch (action.actionType) {
      case 'event-modified':
        for (var eventsIt in this.events) {
          if (this.events[eventsIt].uuid === action.payload.id) {
            this.events[eventsIt] = action.payload.data;
            break;
          }
        }
        this.emit('change');
        return state;

      case 'event-add':
        this.events.push({});
        this.emit('change');
        return state;

      case 'event-fetched':
        this.events = action.payload;
        return state.set('events', this.events);

      default:
        return state;
    }
  }

  fetch() {
    this.socket.get(this.url, data => {
      this.dispatcher.dispatch({
        actionType: 'event-fetched',
        payload: data
      });
    });
  }

  add(state) {
    this.socket.post(this.url, state, data => {
      console.log('User added :: ', data);
      this.fetch();
    });
  }

  save(id, state) {
    this.socket.put(this.url + '/' + id, state, data => {
      console.log('User saved :: ', data);
    });
  };

  destroy(id) {
    this.socket.delete(this.url + '/' + id, data => {
      console.log('User destroyed :: ', data);
      this.fetch();
    });
  }
}


/**
 * Exports
 *
 */

module.exports = EventStore;
