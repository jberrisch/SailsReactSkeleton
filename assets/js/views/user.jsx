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
      users: false,
      adding: false
    };
  }

  componentDidMount() {
    if (!this.subscribed) {
      this.props.model.subscribe(() => this.fetched());
      this.subscribed = true;
    }

    this.props.model.fetch();
  }

  fetched() {
    this.setState({
      users: this.props.model.users
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
    if (!user.uuid) {
      this.props.model.add(state);
      this.setState({
        adding: false
      });
    }
    else {
      this.props.model.save(user.uuid, state);
    }
  }

  destroy(user) {
    if (!user.uuid) {
        return;
    }

    this.props.model.destroy(user.uuid);
    this.setState({
      users: this.props.model.users
    });
  }

  render() {
    var main;
    var users = this.props.model.users;

    if (this.state.users) {
      var userItems = this.state.users.map(user => {
        return (
          <UserItem
            key={user.uuid}
            model={this.props.model}
            uuid={user.uuid}
            user={user}
            onAdd={this.add.bind(this, user)}
            onSave={this.save.bind(this, user)}
            onDestroy={this.destroy.bind(this, user)}
          />
        );
      });

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
      <div className='userView'>
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
