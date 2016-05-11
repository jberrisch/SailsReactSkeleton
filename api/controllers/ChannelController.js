/**
 * ChannelController
 *
 * @description :: Server-side logic for managing channels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req, res) {
		sails.models.channel.list(function(err, result) {
			if (err) return res.serverError('ERR_CHANNEL_LIST');

			res.send(result);
		});
	}
};
