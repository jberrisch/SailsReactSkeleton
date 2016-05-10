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



    return (
        <div className='section-members'>
          <h2>Members</h2>
          {main}
          <div className="buttons">
            <button onClick={this.add.bind(this)} className={this.state.activeView==='add' ? 'icon-add-user active' : 'icon-add-user' }>
            </button>
            <button className={this.state.activeView==='list' ? 'icon-user-list active' : 'icon-user-list' } onClick={this.backToList.bind(this)}>
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

module.exports = UserView;
