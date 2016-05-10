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

        this.store = this.props.store;
        this.state = {
            users: this.store.get('users')
        };
    }

    componentDidMount() {
      if (!this.listening) {
        this.store.on('change', this.listener.bind(this));
        this.listening = true;
      }
    }

    componentWillUnmount() {
      if (this.listening) {
        this.store.removeListener('change', this.listener);
        this.listening = false;
      }
    }

    listener() {
        this.setState({
            users: this.store.get('users')
        });
    }

    componentWillUnmount() {
        if (this.listenerToken) {
            this.listenerToken.remove();
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

        if (this.state.users) {
            var userItems = this.state.users.map((user, key) => {
                return (
                    <UserItem
                        id={user.id}
                        key={user.id}
                        store={this.store}
                        storeKey={key}
                        user={user}
                        onDestroy={this.destroy.bind(this, user)}
                    />
                );
            });

            main = (
                    <table>
                        <tbody>
                        {userItems}
                        </tbody>
                    </table>
            );
        }

        return (
            <div className="user-list">
                {main}
            </div>
        );
    }
}


/**
 * Exports
 *
 */

module.exports = UserView;
