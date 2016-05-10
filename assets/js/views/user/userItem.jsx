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
          <button onClick={this.destroy.bind(this)}><img className="icon" src="/images/svg/cross.svg" alt="delete" /></button>
      );
    }

    return (
        <tr>
          <td width="200">
            {this.state.username}
          </td>
          <td width="200">
            {this.state.email}
          </td>
          <td>
            <input
                type='checkbox'
                name='publish'
                checked={this.state.publish}
                onChange={this.changeUi}
            />
          </td>
          <td>
            {deleteBtn}
          </td>
        </tr>
    );
  }
}


/**
 * Exports
 *
 */

module.exports = UserItem;
