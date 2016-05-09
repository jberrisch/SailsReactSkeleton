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

    this.state = {};
  }

  componentDidMount() {
    this.setState({
      events: []
    });

    if (!this.listenerToken) {
      this.listenerToken = this.props.route.store.addListener(() => {
        this.setState({
          events: this.props.route.store.get('events')
        })
      });
    }

    this.props.route.store.fetch();
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
