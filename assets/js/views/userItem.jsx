/**
 * Modules
 *
 */

var React = require('react');


/**
 * Class
 *
 */

class UserItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);

    this.state = {
      email: (this.props.user.email || ''),
      password: (this.props.user.password || '')
    };
  }

  handleChange(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  save() {
    this.props.onSave(this.state);
  }

  render() {
    return (
      <li>
        <div>
          <input
            type='text'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            type='email'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
        <button onClick={this.save}>Save</button>
        </div>
      </li>
    );
  }
}


/**
 * Exports
 *
 */

module.exports = UserItem;
