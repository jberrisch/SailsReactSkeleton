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

        this._listener = this.listener.bind(this);
        this._listenEvent = 'change-item-' + this.props.id;
    }

    componentDidMount() {
        if (!this.listening) {
            this.store.on(this._listenEvent, this._listener);
            this.listening = true;
        }
    }

    componentWillUnmount() {
        if (this.listening) {
            this.store.removeListener(this._listenEvent, this._listener);
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
        },
        () => {
            this.props.store.save( this.props.id, this.state );
        });
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
