/**
 * Modules
 *
 */

var React = require('react');
var EventItem = require('./eventItem.jsx');


/**
 * Class
 *
 */

class EventList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.store = this.props.store;
        this.state = {
            events: this.store.get()
        };

        this._listener = this.listener.bind(this);
    }

    componentDidMount() {
      if (!this.listening) {
        this.store.on('change', this._listener);
        this.listening = true;
      }
    }

    componentWillUnmount() {
      if (this.listening) {
        this.store.removeListener('change', this._listener);
        this.listening = false;
      }
    }

    listener() {
        this.setState({
            events: this.store.get('events')
        });
    }

    destroy(event) {
        if (!event.id) {
            return;
        }

        this.store.destroy(event.id);
        this.setState({
            events: this.store.events
        });
    }

    render() {
        var main;

        if (this.state.events) {
            var eventItems = this.state.events.map((event, key) => {
                return (
                    <EventItem
                        id={event.id}
                        key={event.id}
                        store={this.store}
                        storeKey={key}
                        event={event}
                        onDestroy={this.destroy.bind(this, event)}
                    />
                );
            });

            main = (
                    <table>
                        <tbody>
                        {eventItems}
                        </tbody>
                    </table>
            );
        }

        return (
            <div className="user-list">
                {main}
            </div>
        );
    }
}


/**
 * Exports
 *
 */

module.exports = EventList;
