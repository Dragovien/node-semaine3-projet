const sanitize = require('../middlewares/sanitize.js')
// const token = require('../middlewares/verifyToken.js')

module.exports = app => {
  const controller = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.post("/verifyToken", controller.verifyToken)
  router.post("/login", sanitize.sanitizedInputs, controller.login);
  router.post("/createAccount",sanitize.sanitizedInputs, controller.createAccount);
  
  app.use('/user', router);
};