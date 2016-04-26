/**
 * Modules
 *
 */

var React = require('react');
var ReactDOM = require('react/lib/ReactDOM');
var UserView = require('./views/user.jsx');
var UserModel = require('./models/user.jsx');


/**
 * Properties
 *
 */

var socket = io.sails.connect();
var userModel = new UserModel('user', socket);


/**
 * Render
 *
 */

ReactDOM.render(
  <UserView model={userModel} />,
  document.getElementById('userapp')
);
