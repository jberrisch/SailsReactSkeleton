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

        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thirsday', 'Friday', 'Saturday'];
        this.store = this.props.route.store;
        this.state = {
            channels: [],
            events: [],
            days: this.getDays(this.props.start)
        };

        this._listener = this.listener.bind(this);
    }

    getDays(start, range= 7) {

        var days = [];
        var startDate = start ? new Date(start) : Event.getFirstDay();

        for (let i = 0, j = range; i<j; ++i) {
            if (i ===0 ) days.push(startDate);
            else days.push(Event.getDayFromOffset(startDate, i));
        }

        return days;

    }

    static getFirstDay() {
        var _today = new Date();

        while (_today.getDay() !== 1) {
            console.log(_today.getDay())
            _today = Event.getDayFromOffset(_today, _today.getDay() !== 0 ? -1 : 1);
        }

        return _today;

    }

    static getDayFromOffset(day, offset = 1 ){
        var _newDay = new Date(day.getTime());
        return new Date( _newDay.setDate( _newDay.getDate() + offset) );
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
                    <thead>
                    {this.renderDays()}
                    </thead>
                    <tbody>
                    {this.renderChannels()}
                    </tbody>
                </table>
            </div>
        );

    }

    renderDays() {
        var dayName;
        return <tr>
            {
                this.state.days.map( day => {
                    dayName = this.days[day.getDay()];
                    return <th key={'day-'+dayName}> {dayName} { day.getDate() } </th>;
                    })
                }
        </tr>;
    }

    renderChannels() {
        return this.state.channels.map(function(channel) {
            return <tr>
                {channel.name}
                </tr>
        });
    }
}


/**
 * Exports
 *
 */

module.exports = Event;
