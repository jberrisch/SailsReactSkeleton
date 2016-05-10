/**
 * Modules
 *
 */

var React = require('react');


/**
 * Class
 *
 */

class AccountAdd extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.store = this.props.store;
        this.state = {};
    }

    add(e) {
        e.preventDefault();
        this.store.add({
            firstname: this.refs.firstname.value,
            lastname: this.refs.lastname.value,
            publish: false,
            user: {
                email: this.refs.email.value,
                username: this.refs.firstname.value + ' ' + this.refs.lastname.value
            }
        });
    }

    render() {

        return (
            <form ref="form" className='small-form' onSubmit={this.add.bind(this)}>
                <label for="add-firstname">Firstname</label>
                <input id="add-firstname" ref="firstname" type="text" name='firstname' required />
                <label for="add-lastname">Lastname</label>
                <input id="add-lastname" ref="lastname" type="text" name='lastname' required />
                <label for="add-email">Email</label>
                <input id="add-email" ref="email" type="email" name='email' required />
                <button type="submit" className="icon-plus"></button>
            </form>
        );
    }
}


/**
 * Exports
 *
 */

module.exports = AccountAdd;
