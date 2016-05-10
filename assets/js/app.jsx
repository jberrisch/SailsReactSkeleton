/**
 * Modules
 *
 */

var React = require('react');
var ReactDOM = require('react/lib/ReactDOM');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Dispatcher = require("flux").Dispatcher;

var AccountView = require('./views/account/account.jsx');
var AccountStore = require('./stores/account.js');

var EventView = require('./views/event.jsx');
var EventStore = require('./stores/event.js');


/**
 * Properties
 *
 */

var sio = io.sails.connect();
var dispatcher = new Dispatcher();

var accountStore = new AccountStore(dispatcher, 'account', sio);
var eventStore = new EventStore(dispatcher, 'event', sio);


/**
 * Render
 *
 */

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/index/account" component={AccountView} store={accountStore}/>
    <Route path="/index/event" component={EventView} store={eventStore}/>
  </Router>
), document.getElementById('app'));
