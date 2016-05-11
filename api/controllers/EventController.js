/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    fromTo: function(req, res) {
		sails.models.event.fromTo(req.query.from, req.query.to, function(err, results) {
			if (err) return res.serverError('ERR_EVENT_FROM_TO');

            var channels = {};
            results.forEach(result => {
                if (result && result.channels) {
                    result.channels.forEach(channel => {
                        if (!channels[channel.id]) {
                            channels[channel.id] = [];
                        }

                        var event = sails.util._.clone(result);
                        delete event.channels;
                        channels[channel.id].push(event);
                    });
                }
            });

			res.send(channels);
		});
	}
};
