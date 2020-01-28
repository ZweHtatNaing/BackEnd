const userServices = require('../services/user-services');
const appUserServices = require('../services/appUser-services');
const validator = require("email-validator");

const user_services = new userServices();
const appuser_services = new appUserServices();

exports.create = async(req, res, next) => {
    try {
       if(validator.validate(req.body.username)){
           // Create Application USer
           const appUserObject = await appuser_services.createAppUser({username: req.body.username, password: req.body.password});
           if(appUserObject){
            // Create User
            const userObject = await user_services.createUser({fullName: req.body.fullName, appUser: appUserObject._id});
               res.status(200).send({
                   message: 'Succeed',
                   data: userObject,
                   code: true
               });
           }else{
               res.status(200).send({
                   message: 'Your request is not succeed, please try again later.',
                   data: null,
                   code: false
               });
           }
       }else{
           res.status(200).send({
               message: 'Username must be an email.',
               data: null,
               code: false
           });
       }
    } catch (err) {
        res.status(500).send({
            message: 'Oops, something went wrong while processing your request!.',
            stackTrace: err
        });
    }
};

exports.getOne = async(req, res, next) => {
    try {
        const userObject = await user_services.getByFilter({fullName: req.params.fullName});
        res.status(200).send({
            message: 'Succeed',
            data: userObject,
            code: true
        });
    } catch (err) {
        res.status(500).send({
            message: 'Oops, something went wrong while processing your request!.',
            stackTrace: err
        });
    }
};