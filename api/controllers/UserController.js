/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  loginCheck: function(req, res) {
      if (req.session.authenticated) {
          return res.redirect('event/app');
      }

      return res.view('login');
  },

  save: function(req, res, next) {
    console.log('In user controller....');
    console.log(req.body);

    return res.send('ok');
  }
};
