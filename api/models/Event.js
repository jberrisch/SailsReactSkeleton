/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require('uuid');

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },

    uuid: {
      type: 'string',
      size: 36,
      defaultsTo: function() {
        return uuid.v4();
      }
    },

    content: {
      type: 'text'
    }
  }

};