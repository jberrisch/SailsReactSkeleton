/**
 * Modules
 *
 */

var React = require('react');
var AccountList = require('./accountList.jsx');
var AccountAdd = require('./accountAdd.jsx');


/**
 * Class
 *
 */

class AccountView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.store = this.props.route.store;
    this.state = {
      activeView: 'list'
    };
  }

  componentDidMount() {
    if (!this.listening) {
      this.store.on('change', this.listener.bind(this));
      this.listening = true;
    }

    this.store.fetch();
  }

  componentWillUnmount() {
    if (this.listening) {
      this.store.removeListener('change', this.listener);
      this.listening = false;
    }
  }

  listener() {
      this.setState({
        activeView: 'list'
    });
  }

  componentWillUnmount() {
    if (this.listenerToken) {
      this.listenerToken.remove();
    }
  }

  add() {
    this.setState({
      activeView : 'add'
    });
  }

  backToList() {
    this.setState({
      activeView: 'list'
    })
  }

  render() {
    var main;

    if (this.state.activeView === 'list') {

      main =<AccountList store={this.store} />;
    } else {
      main = <AccountAdd store={this.store} />;
    }

    return (
        <div className='section-members'>
          <h2>Members</h2>
          {main}
          <div className="buttons">
            <button onClick={this.add.bind(this)} className={this.state.activeView==='add' ? 'icon-add-user active' : 'icon-add-user' }>
              <img className="icon" src="/images/svg/user.svg" alt="" />
              <img className="icon small" src="/images/svg/plus.svg" alt="" />
            </button>
            <button className={this.state.activeView==='list' ? 'icon-add-user active' : 'icon-add-user' } onClick={this.backToList.bind(this)}>
              <img className="icon" src="/images/svg/user.svg" alt="" />
              <img className="icon small" src="/images/svg/cross.svg" alt="" />
            </button>
            </div>
        </div>
    );
  }
}


/**
 * Exports
 *
 */

module.exports = AccountView;
