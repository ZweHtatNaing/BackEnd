const bcrypt = require('bcrypt');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
const { secret } = require('../config');
const appUserServices = require('../services/appUser-services');


const { getList, getById, getByFilter, getByFilters } = new appUserServices();
class authServices {
    // Validate User
    async validateUser(email, password){
       try {
           if(typeof password === 'string' && validator.validate(email)){
                const currentUser = await getByFilter({username: email});
                if(currentUser !== null){
                    const isValid = await new Promise((resolve, reject) => {
                        bcrypt.compare(password, currentUser.password, (err, result) => {
                            if (err) reject(err);
                            if(result === true){
                                resolve(currentUser);
                            }else{
                                resolve(null);
                            }
                        });
                    });
                    return isValid;
                }else {
                    return null;
                }
           }else{
               throw {name : "EmailValidationError", message : "Email format is not valid."};
           }
       }catch (err) {
           throw err;
       }
    }

    authorize(){
        return expressJwt({ secret });
    }

    generateToken(value){
        const token = jwt.sign({ sub: value}, secret);
        return token;
    }
}
module.exports = authServices;