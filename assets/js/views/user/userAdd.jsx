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
        console.log(this.refs.form.value().validation)
        this.props.route.store.add({
            username: this.refs.username.value,
            email: this.refs.email.value,
            publish: false
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
                <button type="submit"><img className="icon" src="/images/svg/plus.svg" alt="add" /></button>
            </form>
        );
    }
}


/**
 * Exports
 *
 */

module.exports = UserAdd;
