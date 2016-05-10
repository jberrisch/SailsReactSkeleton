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

        this.store = this.props.store;
        this.state = {
            email: (this.props.user.email || ''),
            username: (this.props.user.username || ''),
            publish: (this.props.user.publish || false)
        };
    }

    componentDidMount() {
        if (!this.listening) {
            this.store.on('change-item-' + this.props.id, this.listener.bind(this));
            this.listening = true;
        }
    }

    componentWillUnmount() {
        if (this.listening) {
            this.store.removeListener('change-item-' + this.props.id, this.listener);
            this.listening = false;
        }
    }

    listener() {
        this.setState({
            email: this.store.users[this.props.storeKey].email,
            username: this.store.users[this.props.storeKey].username,
            publish: this.store.users[this.props.storeKey].publish
        });
    }

    changePublishRights(e) {
        this.setState({
            publish: e.target.checked || false
        });

        this.props.store.save( this.props.id, this.state );
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
                <button onClick={this.destroy.bind(this)}><img className="icon small" src="/images/svg/cross.svg" alt="delete" /></button>
            );
        }

        var name = this.state.username.split('|');

        return (
            <tr>
                <td width="33%">
                    {name[0]} {name[1]}
                </td>
                <td width="53%">
                    {this.state.email}
                </td>
                <td width="2%">
                    <label className="checkbox">
                        <input
                            type='checkbox'
                            name='publish'
                            checked={this.state.publish}
                            onChange={this.changePublishRights.bind(this)}
                        />
                        <i></i>
                    </label>
                </td>
                <td width="2%">
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
