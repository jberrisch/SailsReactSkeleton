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
      username: (this.props.user.username || ''),
      publish: (this.props.user.publish || false)
    };
  }

  componentDidMount() {
    if (!this.listenerToken) {
      this.listenerToken = this.props.store.addListener(data => {

        console.log("GET LIST EVENT");
        console.log("Data:", this.props.store.get('users', this.props.id));
        // this.setState({
        //   users: this.props.store.get('users')
        // })
      });
    }
  }

  componentWillUnmount() {
    if (this.listenerToken) {
      this.listenerToken.remove();
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

    if (this.props.id) {
      deleteBtn = (
        <button onClick={this.destroy.bind(this)}>Delete</button>
      );
    }

    return (
      <li>
        <div>
          <input
            type='text'
            name='username'
            value={this.state.username}
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
