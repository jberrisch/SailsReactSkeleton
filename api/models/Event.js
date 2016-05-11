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

        date_from: {
            type: 'datetime'
        },

        date_to: {
            type: 'datetime'
        },

        content: {
            type: 'text'
        },

        channels: {
            collection: 'channel',
            via: 'event',
            through: 'eventchannel'
        }
    },

    fromTo: function(from, to, cb) {
        this.find({date_from: {'>=': from}, date_to: {'<': to}}).populate('channels').exec(cb);
    }

};
