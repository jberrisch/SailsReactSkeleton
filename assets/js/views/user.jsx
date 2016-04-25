/**
 * Modules
 *
 */

var React = require('react');
var UserItem = require('./userItem.jsx');


/**
 * Class
 *
 */

class UserView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fetched: false,
      adding: false
    };
  }

  componentDidMount() {
    this.props.model.subscribe(() => this.fetched());
    this.props.model.fetch();
  }

  fetched() {
    this.setState({
      fetched: true
    });
  }

  add() {
    if (this.state.adding) {
        return;
    }

    this.props.model.users.push({});
    this.setState({
      adding: true
    });
  }

  save(user, state) {
    if (!user.id) {
      this.props.model.add(state);
    }
    else {
      this.props.model.save(user.id, state);
    }
  }

  render() {
    var main;
    var users = this.props.model.users;

    var userItems = users.map(user => {
        return (
          <UserItem
            key={user.uuid}
            uuid={user.uuid}
            user={user}
            onAdd={this.add.bind(this, user)}
            onSave={this.save.bind(this, user)}
          />
        );
      }
    );

    if (users.length) {
      main = (
        <section id="main">
          <p>Description never changes</p>
          <ul id="user-list">
              {userItems}
          </ul>
        </section>
      );
    }

    return (
      <div>
        Users:
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

module.exports = UserView;
