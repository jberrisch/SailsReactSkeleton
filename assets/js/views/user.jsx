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

    this.store = this.props.route.store;
    this.state = {
      users: this.store.get('users'),
      adding: false
    };
  }

  componentDidMount() {
    this.setState({
      users: []
    });
    if (!this.listenerToken) {
      this.listenerToken = this.store.addListener(() => {
        this.setState({
          users: this.store.get('users')
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

  add() {
    if (this.state.adding) {
        return;
    }

    this.store.dispatcher.dispatch({ actionType: 'user-add'});
    this.setState({
      adding: true
    });
  }

  save(user, state) {
    if (!user.id) {
      this.store.add(state);
      this.setState({
        adding: false
      });
    }
    else {
      this.store.save(user.id, state);
    }
  }

  destroy(user) {
    if (!user.id) {
        return;
    }

    this.store.destroy(user.id);
    this.setState({
      users: this.store.users
    });
  }

  render() {
    var main;
    var users = this.store.users;

    if (this.state.users) {
      var userItems = this.state.users.map(user => {
        return (
          <UserItem
            key={user.id}
            store={this.store}
            id={user.id}
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
