/**
 * Modules
 *
 */

var React = require('react');
var EventList = require('./eventList.jsx');
var EventAdd = require('./eventAdd.jsx');


/**
 * Class
 *
 */

class Event extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.store = this.props.route.store;
    this.state = {
      activeView: 'list'
    };

    this._listener = this.listener.bind(this);
  }

  componentDidMount() {
    if (!this.listening) {
      this.store.on('change', this._listener);
      this.listening = true;
    }

    this.store.fetchChannels();
    this.store.fetch();
  }

  componentWillUnmount() {
    if (this.listening) {
      this.store.removeListener('change', this._listener);
      this.listening = false;
    }
  }

  listener() {
      this.setState({
        activeView: 'list'
    });
  }

  add() {
    this.setState({
      activeView : 'add'
    });
  }

  backToList() {
    this.setState({
      activeView: 'list'
    })
  }

  render() {
    var main;

    if (this.state.activeView === 'list') {

      main =<EventList store={this.store} />;
    } else {
      main = <EventAdd store={this.store} />;
    }

    return (
        <div className='section-members'>
          <h2>Members</h2>
          {main}
          <div className="buttons">
            <button onClick={this.add.bind(this)} className={this.state.activeView==='add' ? 'icon-add-user active' : 'icon-add-user' }>
            </button>
            <button className={this.state.activeView==='list' ? 'icon-user-list active' : 'icon-user-list' } onClick={this.backToList.bind(this)}>
            </button>
            </div>
        </div>
    );
  }
}


/**
 * Exports
 *
 */

module.exports = Event;
