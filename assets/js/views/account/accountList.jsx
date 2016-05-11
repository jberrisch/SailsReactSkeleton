/**
 * Modules
 *
 */

var React = require('react');
var AccountItem = require('./accountItem.jsx');


/**
 * Class
 *
 */

class AccountList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.store = this.props.store;
        this.state = {
            accounts: this.store.get()
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
            accounts: this.store.get('accounts')
        });
    }

    destroy(account) {
        if (!account.id) {
            return;
        }

        this.store.destroy(account.id);
        this.setState({
            accounts: this.store.accounts
        });
    }

    render() {
        var main;

        if (this.state.accounts) {
            var accountItems = this.state.accounts.map((account, key) => {
                return (
                    <AccountItem
                        id={account.id}
                        key={account.id}
                        store={this.store}
                        storeKey={key}
                        account={account}
                        onDestroy={this.destroy.bind(this, account)}
                    />
                );
            });

            main = (
                    <table>
                        <tbody>
                        {accountItems}
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

module.exports = AccountList;
