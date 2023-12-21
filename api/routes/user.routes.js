const sanitize = require('../middlewares/sanitize.js')

module.exports = app => {
  const controller = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.get("", controller.getAll);
  router.get("/logout", controller.logout);
  router.post("/verifyToken", controller.verifyToken)
  router.post("/login", sanitize.sanitizedInputs, controller.login);
  router.post("/createAccount",sanitize.sanitizedInputs, controller.createAccount);
  router.post("/updateAccount",sanitize.sanitizedInputs, controller.updateAccount);
  router.post("/deleteAccount", controller.deleteAccount);
  
  app.use('/user', router);
};