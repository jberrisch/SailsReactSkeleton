/**
* Modules
*
*/

var EventEmitter = require('events').EventEmitter;


/**
* Class
*
*/

class Event extends EventEmitter {
    constructor(dispatcher, channel, socket) {
        super();

        this.mapStore = require('flux/utils').MapStore;

        this.dispatcher = dispatcher;
        this.dispatcherToken = this.dispatcher.register(action => this.reduce(action));
        this.channel = channel;
        this.socket = socket;
        this.url = '/' + channel;

        this.events = [];
        this.channels = [];

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
        return this.events;
    }

    reduce(action) {
        if (!action || !action.actionType) {
            return;
        }

        switch (action.actionType) {
            case 'account-modified':
                for (var eventsIt in this.events) {
                    if (this.events[eventsIt].id === parseInt(action.payload.id)) {
                        this.events[eventsIt] = action.payload.data;
                        this.emit('change-item-' + this.events[eventsIt].id);
                        break;
                    }
                }
                break;

            case 'account-add':
                this.events.push({});
                return this.emit('change');

            default:
                return;
        }
    }

    fetch() {
        this.socket.get(this.url, data => {
            this.events = data;
            this.emit('change');
        });
    }

    fetchChannels() {
        this.socket.get('/channel/list', data => {
            console.log(data)
            this.channels = data;
            this.emit('change');
        });
    }

    add(state) {
        this.socket.post(this.url, state, data => {
            console.log('Event added :: ', data);
            this.fetch();
        });
    }

    save(id, state) {
        this.socket.put(this.url + '/' + id, state, data => {
            console.log('Event saved :: ', data);
        });
    };

    destroy(id) {
        this.socket.delete(this.url + '/' + id, data => {
            console.log('Event destroyed :: ', data);
            this.fetch();
        });
    }
}


/**
* Exports
*
*/

module.exports = Event;
