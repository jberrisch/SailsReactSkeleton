/**
 * Modules
 *
 */

var MapStore = require('flux/utils').MapStore;


/**
 * Class
 *
 */

class UserStore extends MapStore {
  constructor(dispatcher, channel, socket) {
    super(dispatcher);

    this.dispatcher = dispatcher;
    this.channel = channel;
    this.socket = socket;
    this.url = '/' + channel;

    this.users = [];

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
        actionType: 'user-modified',
        payload: msg
      });
    });
  }

  reduce(state, action) {
    if (!action || !action.actionType) {
      return state;
    }

    switch (action.actionType) {
      case 'user-modified':
        for (var usersIt in this.users) {
          if (this.users[usersIt].uuid === action.payload.id) {
            this.users[usersIt] = action.payload.data;
            break;
          }
        }
        this.emit('change');
        return state;

      case 'user-add':
        this.users.push({});
        this.emit('change');
        return state;

      case 'user-fetched':
        this.users = action.payload;
        return state.set('users', this.users);

      default:
        return state;
    }
  }

  fetch() {
    this.socket.get(this.url, data => {
      console.log("FETCHED DATA:");
      console.log(data);
      this.dispatcher.dispatch({
        actionType: 'user-fetched',
        payload: data
      });
    });
  }

  add(state) {
    if (state && state.email) {
      state.identifier = state.email;
    }

    this.socket.post('/register', state, data => {
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

module.exports = UserStore;
