/**
 * Modules
 *
 */

var React = require('react');
var EventList = require('./eventList.jsx');
var EventAdd = require('./eventAdd.jsx');


/**
 * Class
 *
 */

class Event extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.store = this.props.route.store;
        this.state = {
            channels: [],
            events: [],
            days: 7
        };

        this._listener = this.listener.bind(this);
    }

    componentDidMount() {
        if (!this.listening) {
            this.store.on('change', this._listener);
            this.listening = true;
        }

        this.store.fetchChannels();
        this.store.fetch();
    }

    componentWillUnmount() {
        if (this.listening) {
            this.store.removeListener('change', this._listener);
            this.listening = false;
        }
    }

    listener() {
        this.setState({
            channels: this.store.channels || this.state.channels,
            events: this.store.events
        });
    }

    render() {

        console.log(this.state)
        return (
            <div className='section-events'>
                <table>
                    <tbody>
                    {
                        this.state.channels.map((channel, i) => {


                            return <tr key={"channel-"+i}>
                                <td>{channel.name}</td>
                                {
                                    this.buildTableCells(i)
                                    }

                            </tr>;
                            })
                        }
                    </tbody>
                </table>
            </div>
        );

    }

    buildTableCells(row) {

        var tds = [];
        for (let i = 0; i< this.state.days; ++i) {
            tds.push(
                <td key={"row-"+row+'-'+i}>Day {i}</td>
            );
        }

        return tds.map(td => {
            return td;
        });
    }
}


/**
 * Exports
 *
 */

module.exports = Event;
