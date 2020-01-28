const {authenticateUser, authenicate} = require('../controller/auth');
const authServices = require('../services/auth-services');
const { authorize } = new authServices();

module.exports = function (app) {
    //authenticate user
    app.route('/api/authenticateuser')
        .post(authenticateUser);

    // Validate Token
    app.route('/api/authenticate')
        .get(authorize(),authenicate);
};