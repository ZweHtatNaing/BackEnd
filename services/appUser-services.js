const bcrypt = require('bcrypt');
const AppUser = require('../model/appuser-model/model');

const saltRounds = 5;

class AppUserServices {

    //Get list of App User records
    getList() {
        try {
            return AppUser.find();
        } catch (err) {
            throw err;
        }
    }

    //Get App User by Id
    getById(Id){
        try {
            return AppUser.findById(Id);
        }catch (err) {
            throw err;
        }
    }

    //Get App User lists by given query filter query eg. ({username:'test@gmail.com'})
    getByFilters(query){
        try {
            let queryBuilder = AppUser.find();
            for (const key in query) {
                queryBuilder.where(key).equals(query[key]);
            }
            return queryBuilder.exec();
        }catch (err) {
            throw err;
        }
    }

    //Get App User by given query filter query eg. ({username:'test@gmail.com'})
    getByFilter(query){
        try {
            let queryBuilder = AppUser.findOne();
            for (const key in query) {
                queryBuilder.where(key).equals(query[key]);
            }
            return queryBuilder.exec();
        }catch (err) {
            throw err;
        }
    }

    //Create App User
    async createAppUser(appUserObject){
        try {
            const newAppUser = await new Promise((resolve, reject) => {
                bcrypt.hash(appUserObject.password, saltRounds, (err, hash) =>{
                    if (err) reject(err);
                    appUserObject.password = hash;
                    const appUserModel = new AppUser(appUserObject);
                    const resultObject = appUserModel.save();
                    resolve(resultObject);
                });
            });
            return newAppUser;
        }catch (err) {
            throw err;

        }
    }
}
module.exports = AppUserServices;