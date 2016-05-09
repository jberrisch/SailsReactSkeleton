/**
 * Modules
 *
 */

var React = require('react');


/**
 * Class
 *
 */

class EventView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.store = this.props.route.store;
    this.state = {};
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

  render() {
    return (
      <div className='eventView'>
        Salut
      </div>
    );
  }
}


/**
 * Exports
 *
 */

module.exports = EventView;
