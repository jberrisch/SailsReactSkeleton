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

var UserView = require('./views/user.jsx');
var UserStore = require('./stores/user.js');

var EventView = require('./views/event.jsx');
var EventStore = require('./stores/event.js');


/**
 * Properties
 *
 */

var sio = io.sails.connect();
var dispatcher = new Dispatcher();

var userStore = new UserStore(dispatcher, 'user', sio);
var eventStore = new EventStore(dispatcher, 'event', sio);


/**
 * Render
 *
 */

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/index/user" component={UserView} store={userStore}/>
    <Route path="/index/event" component={EventView} store={eventStore}/>
  </Router>
), document.getElementById('app'));
