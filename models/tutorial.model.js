const sql = require("./db.js");
const connection = require("./db.js");

// constructor
const Tutorial = function() {};// this.a = userData.a;

Tutorial.create = (userData,result) => {
  //console.log("99854",userData);
  var account = userData.account;
  var twitterAccount =userData.twitterAccount;
  var myReferralID = userData.referralID;
  var state = 1;
  //time y m d
  function getFormattedDate(today){
    var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var day  = week[today.getDay()];
    var dd   = today.getDate();
    var mm   = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();

    if(dd<10)  { dd='0'+dd } 
    if(mm<10)  { mm='0'+mm } 
    if(minu<10){ minu='0'+minu } 

    return dd+'/'+mm+'/'+yyyy+' '+hour+':'+minu;
  }

var date = new Date();
var newdate = "'"+getFormattedDate(date)+"'";


  var sqlCreate = "INSERT INTO users ";
  var valuesSql = "('"+account+"','"+twitterAccount+"','"+myReferralID+"','"+state+"',"+newdate+");";
  connection.query(sqlCreate+"(account,twitterAccount,myReferralID,state,time) values"+valuesSql, (err, res) => {
    
    if (err) {result(err); console.log("controller 1001error: ", err); return;}

    var resData = JSON.stringify(res);
        resData = JSON.parse(resData);  
    //console.log("show 1......",resData.affectedRows);
    if (res && resData.affectedRows == 1 ){

      //console.log("created ok",res);
      result({"created":"1"}); 
      return;
    }
    
    console.log("error 1002");
    return;

  });
};

Tutorial.checkUser = (userData,result) => {

  var twitterAccount =userData.twitterAccount;
  var account =userData.account;
  var sqlSelect = "SELECT twitterAccount FROM users WHERE twitterAccount="+"'"+twitterAccount+"' OR account='"+account+"';";

    connection.query(sqlSelect, (err, res) => {

    // console.log("sqlSelect...",sqlSelect);
    if (err) {result(err); console.log("checkUser error: ", err); return;}

      if (res !==undefined) {

        if(res.length === 0){

          result({"created":"0"}); 

        }else if(res.length === 1){

          result({"created":"1"}); 

        }else{
          console.log("err checkUser=>001");
          result({"created":"1"}); 
        }
      }  
      // console.log("checkUser ok",res);
      
      return;
    
    
    console.log("others err err checkUser=>002");
    return;

  });

};
//check Referral ID
Tutorial.checkReferralID = (getData,result) => {

  var referralID =getData.referralID;
  var sqlSelect = "SELECT myReferralID FROM users WHERE myReferralID="+"'"+referralID+"';";

    connection.query(sqlSelect, (err, res) => {

    // console.log("sqlSelect...",sqlSelect);
    if (err) {result(err); console.log("checkUser error: ", err); return;}

      if (res !==undefined) {

        if(res.length === 0){

          result({"created":"0"}); 

        }else if(res.length === 1){

          result({"created":"1"}); 

        }else{
          console.log("err checkUser=>001");
          result({"created":"1"}); 
        }
      }  
      // console.log("checkUser ok",res);
      
      return;
    
    
    console.log("others err err checkUser=>002");
    return;

  });

};

//create Referral Data
Tutorial.createReferralData = (upData,result) => {

 
 //time y m d
  function getFormattedDate(today) 
  {
    var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var day  = week[today.getDay()];
    var dd   = today.getDate();
    var mm   = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();

    if(dd<10)  { dd='0'+dd } 
    if(mm<10)  { mm='0'+mm } 
    if(minu<10){ minu='0'+minu } 

    return dd+'/'+mm+'/'+yyyy+' '+hour+':'+minu;
  }

var date = new Date();
var newdate = getFormattedDate(date)+"'";
   
 //lotteryNumbers
  var lotteryNumbers = new Date().getTime();
      lotteryNumbers = lotteryNumbers.toString();
      lotteryNumbers = lotteryNumbers.substring(3);

  var masterReferralID =upData.referralID;
  var fromAccount = upData.account;
  var fromTwitter = upData.twitterAccount;
  var state = 0; //state 审核状态(0待审核 1审核通过(显示乐透号码） 4无效乐透码)
  var sqlCreate = "INSERT INTO lotteryNumbers(masterReferralID,lotteryNumbers,fromAccount,fromTwitter,state,time) values ";

  var valuesSql = "('"+masterReferralID+"','"+lotteryNumbers+"','"+fromAccount+"','"+fromTwitter+"','"+state+"','"+newdate+");";
      sqlCreate = sqlCreate+valuesSql;
      console.log("sqlCreate...new",sqlCreate)
  connection.query(sqlCreate, (err, res) => {
    
    if (err) {result(err); console.log("controller 1003error: ", err); return;}

    var resData = JSON.stringify(res);
        resData = JSON.parse(resData);  
    //console.log("show 1......",resData.affectedRows);
    if (res && resData.affectedRows == 1 ){

      //console.log("created ok",res);
      result({"created":"1"}); 
      return;
    }
    
    console.log("error 1005");
    return;

  });

};

Tutorial.findByAccount = (userData,result) => {

  //console.log("userData...",userData);
  var account = "'"+userData+"'";
  //SELECT a.twitterAccount,a.myReferralID,b.lotteryNumbers,b.fromAccount,b.fromTwitter,b.state,b.time FROM users a INNER JOIN lotteryNumbers b ON a.myReferralID = b.masterReferralID and a.account = "0x";
  var sqlSelect = "SELECT a.twitterAccount,a.myReferralID,b.lotteryNumbers,b.fromAccount,b.fromTwitter,b.state,b.time FROM users a INNER JOIN lotteryNumbers b ON a.myReferralID = b.masterReferralID and a.account="+account+";"

    connection.query(sqlSelect, (err, res) => {

    //console.log("sqlSelect...",sqlSelect);
    if (err) {result(err); console.log("checkUser error: ", err); return;}
    // console.log("create....",res,res.length);
      if (res) {

        if(res.length == 0){

          result({"created":"0"}); 

        }else if(res.length >0){
          result({"created":res}); 

        }else{
          return;
        }
        return;
      }else{
        console.log("others err err checkUser=>002findByAccount err",res);
        return; 
      }  
      return; 

  });

};
Tutorial.findMMMByAccount = (userData,result) => {

  //console.log("userData...",userData);
  var account = "'"+userData+"'";
  //SELECT  a.twitterAccount,a.myReferralID,b.lotteryNumbers,b.fromAccount,b.fromTwitter,b.state,b.time FROM users a INNER JOIN lotteryNumbers b ON a.myReferralID = b.masterReferralID and a.account = "0x416d2b2fbb81ac734cc56230e82e2bff6f3566b1" and b.state="1";
  var sqlSelect = "SELECT a.twitterAccount,a.myReferralID,b.lotteryNumbers,b.fromAccount,b.fromTwitter,b.state,b.time FROM users a INNER JOIN lotteryNumbers b ON a.myReferralID = b.masterReferralID and a.account="+account+" and b.state=1;"

    connection.query(sqlSelect, (err, res) => {

    //console.log("sqlSelect...",sqlSelect);
    if (err) {result(err); console.log("checkUser error: ", err); return;}
    // console.log("create....",res,res.length);
      if (res) {

        if(res.length == 0){

          result({"created":0}); 

        }else if(res.length >0){
          result({"created":res.length}); 

        }else{
          return;
        }
        return;
      }else{
        console.log("others err err checkUser=>002findMMMByAccount err",res);
        return; 
      }  
      return; 

  });

};
Tutorial.findAllInfo = (userData,result) => {

  var sqlSelect = "SELECT a.twitterAccount,a.myReferralID,b.lotteryNumbers,b.fromAccount,b.fromTwitter,b.state,b.time FROM users a INNER JOIN lotteryNumbers b ON a.myReferralID = b.masterReferralID and b.state=1;"

    connection.query(sqlSelect, (err, res) => {

    //console.log("sqlSelect...",sqlSelect);
    if (err) {result(err); console.log("checkUser error: ", err); return;}
    //console.log("create....",res,res.length);
      if (res) {

        if(res.length == 0){

          result({"created":0}); 

        }else if(res.length >0){
          result({"created":res.length}); 

        }else{
          return;
        }
        return;
      }else{
        console.log("others err err checkUser=>findAllInfo err",res);
        return; 
      }  
      return; 

  });

};

module.exports = Tutorial;
