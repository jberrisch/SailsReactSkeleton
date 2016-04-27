/**
 * Class
 *
 */

class UserModel {
  constructor(channel, socket) {
    this.channel = channel;
    this.socket = socket;
    this.url = '/' + channel;

    this.users = [];

    this.cbGlobal = [];
    this.cbItem = {};

    this.connect();
  }

  connect() {
    this.socket.on(this.channel, msg => {
      if (msg.verb === 'created' ||
          msg.verb === 'destroyed') {

        return this.fetch();
      }

      if (msg.id) {
        this.dispatch(msg.id, msg.verb, msg.data);
      }
    });
  }

  subscribe(cb, id, action) {
    if (!cb) {
        return;
    }

    if (!id) {
      this.cbGlobal.push(cb);
    }
    else {
      if (!this.cbItem[id]) {
        this.cbItem[id] = {};
      }

      if (!this.cbItem[id][action]) {
        this.cbItem[id][action] = [];
      }

      this.cbItem[id][action].push(cb);
    }
  }

  dispatch(id, action, data) {
    if (!id) {
      this.cbGlobal.forEach(cb => {
        cb();
      });
    }
    else {
      if (this.cbItem[id] && this.cbItem[id][action]) {
        this.cbItem[id][action].forEach(cb => {
          cb(data);
        });
      }
    }
  }

  fetch() {
    this.socket.get(this.url, data => {
      this.users = data;
      this.dispatch();
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

module.exports = UserModel;
