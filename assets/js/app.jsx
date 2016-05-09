/**
 * Modules
 *
 */

var React = require('react');
var ReactDOM = require('react/lib/ReactDOM');
var Dispatcher = require("flux").Dispatcher;
var UserView = require('./views/user.jsx');
var UserStore = require('./stores/user.js');


/**
 * Properties
 *
 */

var dispatcher = new Dispatcher();
var userStore = new UserStore(dispatcher, 'user', io.sails.connect());


/**
 * Render
 *
 */

ReactDOM.render(
  <UserView store={userStore}/>,
  document.getElementById('userapp')
);
