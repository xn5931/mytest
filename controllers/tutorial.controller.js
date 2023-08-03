const Tutorial = require("../models/tutorial.model.js");


// new user register and get referralID
exports.register = (req, res) => {
  //user upload data
  var getData = req.body.data;
  // console.log("getData...",getData);
  var account = getData.account;
  var twitterAccount = getData.twitterAccount;
  //filter string
  var patternAccount = /[!@#$%^&*()_+\{\}:“<>?,.\/;'\'"[\]\\|`~]+/g;
  var patternTwitter = /[!#$%^&*()_+\{\}:“<>?,.\/;'\'"[\]\\|`~]+/g;
      account = account.replace(patternAccount, '');
      twitterAccount = twitterAccount.replace(patternTwitter, '');

  if (account.length == 0 || twitterAccount.length == 0) {res.send({ "result":"6" ,"msg":"account or twitter is null"});return;}
  if (account.length !==42) {res.send({ "result":"8" ,"msg":"account  wrong format"});return;}
 // console.log("3...",twitterAccount,account)
  //generate UUID
  var nowdate = new Date().getTime();
      nowdate = Math.floor(nowdate / 100);
      nowdate = nowdate.toString();
      nowdate = nowdate.substring(5);
  var newAccount = account.substring(39); 
  var UUID = newAccount+nowdate;

  var userData = {
    "account":getData.account,
    "twitterAccount":getData.twitterAccount,
    "referralID":UUID
  }
  var masterReferralIDWhat =getData.referralID;
  // console.log("1",userData,masterReferralIDWhat);
  if(masterReferralIDWhat && masterReferralIDWhat.length !==0){
    
    //*check user whether exist
    Tutorial.checkUser(userData, (resData) => {

    //console.log("resData.created...",resData.created);
    //no user 
    if (resData.created == "0") {
      
        var masterReferralID = getData.referralID;
        //*check ReferralID  whether exist
        Tutorial.checkReferralID(getData, (checkReferralIDResData) => {

          // console.log("checkReferralIDResData",checkReferralIDResData,checkReferralIDResData.created);
          //success exist create and generate Lottery numbers  
          if (checkReferralIDResData.created == 0) {

            res.send({ "result":"5" ,"msg":"ReferralID error"});
            return ;
            
          }else if(checkReferralIDResData.created == 1){
             //* no user and success invitatio so =>create user
            Tutorial.create(userData, (resCreateData) => {
              if (resCreateData.created == 1) {
                //create Referral Data from user(1)
                Tutorial.createReferralData(getData, (resCreateReferral) => {
                  if (resCreateData.created == 1) {
                   
                    //create Referral Data from masterUser
                    Tutorial.createReferralData(userData, (resCreateReferral) => {
                      if (resCreateData.created == 1) {
                        res.send({ "result":"1" ,"msg":"registration success"});
                      }
                    })
                    
                  }
                  
                  return ; 
                })
                

                //

              }else{
                console.log("err");
                return ;
              }
              
            });

          }else{
            console.log("have err =>checkReferralID");
            return ;
          }

      });
    //have user
    }else if (resData.created == "1") {
      
      res.send({ "result":"4" ,"msg":"user have exist"});
      return ;//message":"user have exist

    }else{
      console.log("err =>");
      return ;
    }
    return ;
 
 });
    
  }else if(masterReferralIDWhat.length ==0){
    // console.log("2");
    //*check user whether exist
    Tutorial.checkUser(userData, (resData) => {

    if (resData.created == "0") {
      
        //* no user and success invitatio so =>create user
        Tutorial.create(userData, (resCreateData) => {

          if (resCreateData.created == 1) {
             //create Referral Data from masterUser
              Tutorial.createReferralData(userData, (resCreateReferral) => {
                if (resCreateData.created == 1) {
                  res.send({ "result":"1" ,"msg":"registration success"});
                }
              })
      
          }else{
            console.log("err");
            return ;
          }  
        });

    }else if (resData.created == "1") {
      
      res.send({ "result":"4" ,"msg":"user have exist"});
      return ;//message":"user have exist

    }else{

      console.log("err =>");
      return ;

    }

    return ;
 
 });
    
}else{
    console.log("have err masterReferralIDWhat")
  }

}

// find user
exports.findOne = (req, res) => {

  var getData = req.body.data;
  if (getData) {
    // console.log("1111",getData)
  
    // console.log("getData...",getData)
    var userData = getData.account;  
    Tutorial.findByAccount(userData, (data) => {

      // console.log("data=>findByAccount", data);
      if (data.created ==0) {
        resData = {
            "masterTwitter":'',
            "masterReferralID":'',
            "referralUserData":[]
          }
        res.send({ "result":resData ,"msg":"success,null"});
     
      }else{
        var resData = data.created;
          resData = {
            "masterTwitter":resData[0].twitterAccount,
            "masterReferralID":resData[0].myReferralID,
            "masterReferralLink":"https://mmmfi.app/Community?ReferralID="+resData[0].myReferralID,
            "referralUserData":resData
          }
          // console.log("resData 000",resData)
        if (resData == 0) {
          res.send({ "result":"0" ,"msg":"null"});
        }else{
          res.send({ "result":resData ,"msg":"success"});
        }
      }
 
    });
    }else{
      console.log("err",getData)
      return ;
  }
};


















// Create and Save a new Tutorial
exports.createdel = (req, res) => {
  // Validate request
  console.log("create...");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Tutorial in the database
  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
//new
exports.findAlldel = (req, res) => {

  Tutorial.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error controller findAll"
      });
    else res.send(data);
  });
};

// Find a single Tutorial by Id
exports.findOnedel = (req, res) => {
   const title = req.query.title;
  Tutorial.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublisheddel = (req, res) => {
  console.log("published...");
  Tutorial.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a Tutorial identified by the id in the request
exports.updatedel = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Tutorial.updateById(
    req.params.id,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.deletedel = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};


