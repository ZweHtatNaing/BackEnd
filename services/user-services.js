const User = require('../model/user-model/model');
class UserServices {

    //Get list of user records
    getList() {
        try {
            return User.find().populate('appUser','username');
        } catch (err) {
            throw err;
        }
    }

    //Get User by Id
    getById(Id){
        try {
            return User.findById(Id).populate('appUser','username');
        }catch (err) {
            throw err;
        }
    }

    //Get User lists by given query filter query eg. ({fullName:'Test'})
    getByFilters(query){
        try {
            let queryBuilder = User.find().populate('appUser','username');
            for (const key in query) {
                queryBuilder.where(key).equals(query[key]);
            }
            return queryBuilder.exec();
        }catch (err) {
            throw err;
        }
    }

    //Get User by given query filter query eg. ({fullName:'Test'})
    getByFilter(query){
        try {
            let queryBuilder = User.findOne().populate('appUser','username');
            for (const key in query) {
                queryBuilder.where(key).equals(query[key]);
            }
            return queryBuilder.exec();
        }catch (err) {
            throw err;
        }
    }

    //Create User
    createUser(userObject){
        try {
            const userModel = new User(userObject);
            return userModel.save();
        }catch (err) {
            throw err;

        }
    }
}
module.exports = UserServices;