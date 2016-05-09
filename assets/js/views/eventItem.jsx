/**
 * Modules
 *
 */

var React = require('react');


/**
 * Class
 *
 */

class EventItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.changeUi = this.changeUi.bind(this);

    this.state = {
      content: (this.props.event.content || '')
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
        <button onClick={this.destroy.bind(this)}>Delete</button>
      );
    }

    return (
      <li>
        <div>
          <input
            type='text'
            name='content'
            value={this.state.content}
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

module.exports = EventItem;
