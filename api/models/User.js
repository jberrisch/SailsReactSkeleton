/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require('uuid');

module.exports = {

  attributes: {
    uuid: {
      primaryKey: true,
      type: 'string',
      size: 36,
      unique: true,
      required: true,
      uuidv4: true,
      defaultsTo: uuid.v4
    },

    email : {
      type: 'string',
      email: true,
      unique: true,
      required: true
    },

    password : {
      type: 'string',
      unique: true,
      required: true
    },

    publish: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    }
  }

};
