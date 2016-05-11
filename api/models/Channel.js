/**
* Channel.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
*/

module.exports = {
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

        name: {
            type: 'string',
            size: 256
        },

        events:{
            collection: 'event',
            via: 'channel',
            through: 'eventchannel'
        }
    },

    list: function(cb) {
        this.find({sort: 'name ASC'}, cb);
    }
};
