const {create, getOne} = require('../controller/user-controller');
const authServices = require('../services/auth-services');

const { authorize } = new authServices();
module.exports = function (app) {

  // Create User Route
  app.route('/api/user')
      .post(create);

  // Get by FullName Route
  app.route('/api/user/:fullName')
      .get(authorize() ,getOne);

};