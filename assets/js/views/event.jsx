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

class EventView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.store = this.props.route.store;
    this.state = {
      events: this.store.get('events'),
      adding: false
    };
  }

  componentDidMount() {
    this.setState({
      events: []
    });

    if (!this.listenerToken) {
      this.listenerToken = this.store.addListener(() => {
        this.setState({
          events: this.store.get('events')
        })
      });
    }

    this.store.fetch();
  }

  componentWillUnmount() {
    if (this.listenerToken) {
      this.listenerToken.remove();
    }
  }

  add() {
    if (this.state.adding) {
        return;
    }

    this.store.dispatcher.dispatch({ actionType: 'event-add'});
    this.setState({
      adding: true
    });
  }

  save(event, state) {
    if (!event.id) {
      this.store.add(state);
      this.setState({
        adding: false
      });
    }
    else {
      this.store.save(event.id, state);
    }
  }

  destroy(event) {
    if (!event.id) {
        return;
    }

    this.store.destroy(event.id);
    this.setState({
      users: this.store.users
    });
  }

  render() {
    var main;
    var events = this.store.events;

    if (this.state.events) {
      var eventItems = this.state.events.map(event => {
        return (
          <EventItem
            key={event.id}
            store={this.store}
            id={event.id}
            event={event}
            onAdd={this.add.bind(this, event)}
            onSave={this.save.bind(this, event)}
            onDestroy={this.destroy.bind(this, event)}
          />
        );
      });

      main = (
        <section id="main">
          <p>Description never changes</p>
          <ul id="event-list">
              {eventItems}
          </ul>
        </section>
      );
    }

    return (
      <div className='userView'>
        Events:
        {main}
        <button onClick={this.add.bind(this)}>Add</button>
      </div>
    );
  }
}


/**
 * Exports
 *
 */

module.exports = EventView;
