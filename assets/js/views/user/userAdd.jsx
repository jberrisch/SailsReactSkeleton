/**
 * Modules
 *
 */

var React = require('react');


/**
 * Class
 *
 */

class UserAdd extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    add(e) {

        e.preventDefault();
        this.props.route.store.add({
            username: this.refs.username.value,
            email: this.refs.email.value,
            publish: this.refs.publish.value ==="on"
        });
    }

    render() {

        return (
            <form className='section-members-add' onSubmit={this.add.bind(this)}>
                <input ref="username" type="text" name='username' />
                <input ref="email" type="email" name='email' /><input
                type='checkbox' ref="publish" name='publish' checked={this.state.publish} />
                <input type="submit" />
            </form>
        );
    }
}


/**
 * Exports
 *
 */

module.exports = UserAdd;
