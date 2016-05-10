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
            users: this.props.route.store.get('users')
        };
    }

    componentDidMount() {
        this.setState({
            users: []
        });
        if (!this.listenerToken) {
            this.listenerToken = this.props.route.store.addListener(() => {

                this.setState({
                    users: this.props.route.store.get('users')
                })
            });
        }

        this.props.route.store.fetch();
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

        this.props.route.store.destroy(user.id);
        this.setState({
            users: this.props.route.store.users
        });
    }

    render() {
        var main;

        if (this.state.users) {
            var userItems = this.state.users.map(user => {
                return (
                    <UserItem
                        key={user.id}
                        store={this.props.route.store}
                        id={user.id}
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
                <h2>Members</h2>
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
