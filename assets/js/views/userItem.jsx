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

    this.changeUi = this.changeUi.bind(this);

    this.state = {
      email: (this.props.user.email || ''),
      password: (this.props.user.password || ''),
      publish: (this.props.user.publish || false)
    };
  }

  componentDidMount() {
    if (!this.subscribed && this.props.uuid) {
      this.props.model.subscribe(data => this.changeSio(data), this.props.uuid, 'updated');
      this.subscribed = true;
    }
  }

  changeSio(data) {
    this.setState(data);
  }

  changeUi(e) {
    var newState = {};

    switch (e.target.type) {
      case 'checkbox':
        newState[e.target.name] = (e.target.checked || false);
        break;
      default:
        newState[e.target.name] = e.target.value;
    }

    this.setState(newState);
  }

  save() {
    this.props.onSave(this.state);
  }

  destroy() {
    this.props.onDestroy();
  }

  render() {
    var deleteBtn;

    if (this.props.uuid) {
      deleteBtn = (
        <button onClick={this.destroy.bind(this)}>Delete</button>
      );
    }

    return (
      <li>
        <div>
          <input
            type='text'
            name='password'
            value={this.state.password}
            onChange={this.changeUi}
          />
          <input
            type='email'
            name='email'
            value={this.state.email}
            onChange={this.changeUi}
          />
          <input
            type='checkbox'
            name='publish'
            checked={this.state.publish}
            onChange={this.changeUi}
          />
          <button onClick={this.save.bind(this)}>Save</button>
          {deleteBtn}
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