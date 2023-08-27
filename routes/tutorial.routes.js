module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();
	  router.post("/api/register",tutorials.register);//ubantu+/api/
	  router.post("/api/userInfo",tutorials.findOne);//ubantu+/api/
	  router.post("/api/allInfo",tutorials.checkAllInfos);//ubantu+/api/
	  app.use('/', router);
};
