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
      users: this.props.store.get('users'),
      adding: false
    };
  }

  componentDidMount() {
    this.setState({
      users: []
    });
    if (!this.listenerToken) {
      this.listenerToken = this.props.store.addListener(() => {
        this.setState({
          users: this.props.store.get('users')
        })
      });
    }

    this.props.store.fetch();
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

    this.props.store.dispatcher.dispatch({ actionType: 'user-add'});
    this.setState({
      adding: true
    });
  }

  save(user, state) {
    if (!user.id) {
      this.props.store.add(state);
      this.setState({
        adding: false
      });
    }
    else {
      this.props.store.save(user.id, state);
    }
  }

  destroy(user) {
    if (!user.id) {
        return;
    }

    this.props.store.destroy(user.id);
    this.setState({
      users: this.props.store.users
    });
  }

  render() {
    var main;
    var users = this.props.store.users;

    if (this.state.users) {
      var userItems = this.state.users.map(user => {
        return (
          <UserItem
            key={user.id}
            store={this.props.store}
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
