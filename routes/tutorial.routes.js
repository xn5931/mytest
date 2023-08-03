module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();
  router.post("/register",tutorials.register);
  router.post("/userInfo",tutorials.findOne);
  app.use('/', router);
};
