/**
 * ChannelController
 *
 * @description :: Server-side logic for managing channels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req, res) {
		console.log("ICI");
		Model.find({sort: 'name DESC' }, data => {
			res.send(data);
		});
	}
};
