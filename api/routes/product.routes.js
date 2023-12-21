const sanitize = require('../middlewares/sanitize.js')

module.exports = app => {
  const controller = require("../controllers/product.controller.js");
  var router = require("express").Router();

  router.get("", controller.getAll);
  router.post("/create", sanitize.sanitizedInputs, controller.create)
  router.post("/delete", sanitize.sanitizedInputs, controller.delete)
  
  app.use('/product', router);
};