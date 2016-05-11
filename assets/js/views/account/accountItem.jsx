/**
 * Modules
 *
 */

var _ = require('lodash');
var React = require('react');


/**
 * Class
 *
 */

class AccountItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.store = this.props.store;
        this.state = {
            firstname: (this.props.account.firstname || ''),
            lastname: (this.props.account.lastname || ''),
            publish: (this.props.account.publish || false),
            user: {
                id: (this.props.account.user.id || ''),
                email: (this.props.account.user.email || ''),
                username: (this.props.account.user.username || '')
            }
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
        var newState = this.state;
        _.merge(this.state, this.store.accounts[this.props.storeKey]);

        this.setState(newState);
    }


    changePublishRights(e) {
        this.setState({
            publish: e.target.checked
        });

        console.log('E target checked:', e.target.checked);
        console.log('State           :', this.state.publish);

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
                <button onClick={this.destroy.bind(this)} className="icon-delete-user"></button>
            );
        }

        console.log("RENDER          :", this.state.publish);

        return (
            <tr>
                <td width="33%">
                    {this.state.firstname} {this.state.lastname}
                </td>
                <td width="53%">
                    {this.state.user.email}
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

module.exports = AccountItem;
