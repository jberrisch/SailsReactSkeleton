/**
 * Modules
 *
 */

var React = require('react');
var UserList = require('./userList.jsx');
var UserAdd = require('./userAdd.jsx');


/**
 * Class
 *
 */

class UserView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeView: 'list',
      adding: false
    };
  }

  componentDidMount() {
    this.setState({
      users: []
    });
    if (!this.listenerToken) {
      this.listenerToken = this.props.route.store.addListener(() => {
        this.setState({
          activeView: 'list'
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

    if (this.state.activeView === 'list' && this.state.users) {

      main =<UserList route={this.props.route} />;
    } else {
      main = <UserAdd route={this.props.route} />;
    }

    var _cancelAddUser = this.state.activeView === 'add' ? (
        <button className="icon-add-user cancel" onClick={this.backToList.bind(this)}>
          <img className="icon" src="/images/svg/user.svg" alt="" />
          <img className="icon small" src="/images/svg/cross.svg" alt="" />
        </button>) : '';

    return (
        <div className='section-members'>
          <h2>Members</h2>
          {main}
          <div className="buttons">
            <button onClick={this.add.bind(this)} className="icon-add-user">
              <img className="icon" src="/images/svg/user.svg" alt="" />
              <img className="icon small" src="/images/svg/plus.svg" alt="" />
            </button>
            {_cancelAddUser}
            </div>
        </div>
    );
  }
}


/**
 * Exports
 *
 */

module.exports = UserView;
