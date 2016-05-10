/**
* Modules
*
*/

var EventEmitter = require('events').EventEmitter;


/**
* Class
*
*/

class UserStore extends EventEmitter {
    constructor(dispatcher, channel, socket) {
        super();

        this.mapStore = require('flux/utils').MapStore;

        this.dispatcher = dispatcher;
        this.dispatcherToken = this.dispatcher.register(action => this.reduce(action));
        this.channel = channel;
        this.socket = socket;
        this.url = '/' + channel;

        this.users = [];

        this.connect();
    }

    connect() {
        this.socket.on(this.channel, msg => {
            if (msg.verb === 'created' ||
                msg.verb === 'destroyed') {

                return this.fetch();
            }

            if (msg.verb === 'updated') {
                this.dispatcher.dispatch({
                    actionType: 'user-modified',
                    payload: msg
                });
            }
        });
    }

    get() {
        return this.users;
    }

    reduce(action) {
        if (!action || !action.actionType) {
            return;
        }

        switch (action.actionType) {
            case 'user-modified':
                for (var usersIt in this.users) {
                    if (this.users[usersIt].id === parseInt(action.payload.id)) {
                        this.users[usersIt] = action.payload.data;
                        this.emit('change-item-' + this.users[usersIt].id);
                        break;
                    }
                }
                break;

            case 'user-add':
                this.users.push({});
                return this.emit('change');

            default:
                return;
        }
    }

    fetch() {
        this.socket.get(this.url, data => {
            this.users = data;
            this.emit('change');
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
