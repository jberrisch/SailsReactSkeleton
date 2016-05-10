/**
* Modules
*
*/

var EventEmitter = require('events').EventEmitter;


/**
* Class
*
*/

class AccountStore extends EventEmitter {
    constructor(dispatcher, channel, socket) {
        super();

        this.mapStore = require('flux/utils').MapStore;

        this.dispatcher = dispatcher;
        this.dispatcherToken = this.dispatcher.register(action => this.reduce(action));
        this.channel = channel;
        this.socket = socket;
        this.url = '/' + channel;

        this.accounts = [];

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
                    actionType: 'account-modified',
                    payload: msg
                });
            }
        });
    }

    get() {
        return this.accounts;
    }

    reduce(action) {
        if (!action || !action.actionType) {
            return;
        }

        switch (action.actionType) {
            case 'account-modified':
                for (var accountsIt in this.accounts) {
                    if (this.accounts[accountsIt].id === parseInt(action.payload.id)) {
                        this.accounts[accountsIt] = action.payload.data;
                        this.emit('change-item-' + this.accounts[accountsIt].id);
                        break;
                    }
                }
                break;

            case 'account-add':
                this.accounts.push({});
                return this.emit('change');

            default:
                return;
        }
    }

    fetch() {
        this.socket.get(this.url, data => {
            console.log("Accounts:", data);
            this.accounts = data;
            this.emit('change');
        });
    }

    add(state) {
        if (state && state.user && state.user.email) {
            state.user.identifier = state.user.email;
        }

        this.socket.post('/register', state.user, data => {
            console.log('User added :: ', data);
            state.user.id = data.id;

            this.socket.post(this.url, state, data => {
                console.log('Account added :: ', data);
                this.fetch();
            })
        });
    }

    save(id, state) {
        console.log("Try to save state %s:", id, state);
        this.socket.put(this.url + '/' + id, state, data => {
            console.log('Account saved :: ', data);
        });
    };

    destroy(id) {
        this.socket.delete(this.url + '/' + id, data => {
            console.log('Account destroyed :: ', data);
            this.fetch();
        });
    }
}


/**
* Exports
*
*/

module.exports = AccountStore;
