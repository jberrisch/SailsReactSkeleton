/**
 * Class
 *
 */

class UserModel {
  constructor(url, socket) {
    this.url = url;
    this.socket = socket;
    this.onChanges = [];
    this.users = [];

    this.connect();
  }

  fetch() {
    this.socket.get(this.url, msg => {
      console.log('Listening msg:' + JSON.stringify(msg));
      
      this.set(msg);
    });
  }

  connect() {
    this.socket.on('user', msg => {
      console.log('Received msg:', msg);

      this.socket.get(this.url, users => {
        this.set(users);
      });
    });
  }

  subscribe(onChange) {
    this.onChanges.push(onChange);
  }

  inform() {
    this.onChanges.forEach(cb => {
      cb();
    });
  }

  set(data) {
    this.users = data;
    this.inform();
  }

  add(state) {
    this.socket.post(this.url, state, data => {
      console.log('User added :: ', data);
    });
  }

  save(id, state) {
    this.socket.put(this.url + '/' + id, state, data => {
      console.log('User saved :: ', data);
    });
  };
}


/**
 * Exports
 *
 */

module.exports = UserModel;
