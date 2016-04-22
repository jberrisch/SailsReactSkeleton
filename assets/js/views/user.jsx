/**
 * Modules
 *
 */

var React = require('react');


/**
 * Class
 *
 */

class UserView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      editing: null
    };
  }

  render() {
    return (
      <div>Hello REACT!</div>
    );
  }
}


/**
 * Exports
 *
 */

module.exports = UserView;
