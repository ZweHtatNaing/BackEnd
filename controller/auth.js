const authServices = require('../services/auth-services');

const { validateUser, authorize, generateToken } = new authServices();

exports.authenticateUser = async(req, res, next) => {
  try {
      const validUser = await validateUser(req.body.username, req.body.password);
      if(validUser){
          const token = await generateToken(validUser._id.toString());
          res.status(200).send({
              message: 'Succeed',
              data: {username: validUser.username, token: token},
              code: true
          });
      }else{
          res.status(200).send({
              message: 'Incorrect User.',
              data: null,
              code: false
          });
      }
  } catch (err) {
      res.status(500).send({
         message: 'Oops, something went wrong while processing your request!.',
          stackTrace: err.stack
      });
  }
};

exports.authenicate = async(req, res, next) => {
    res.status(200).send({
        message: 'Valid Token',
        data: null,
        code: true
    });
}