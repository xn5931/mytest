  const mysql = require('mysql2');
  var con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "mmmfi7799@fi",
    database: "community"

  });
  var i = 0;
  var sqlArr = [];
    //用户表-TABLE
    //uid 自增id
    //account 时间戳 
    //twitterAccount 用户钱包地址 
   
    //state 审核状态(0待审核 1审核通过(显示乐透号码） 4无效乐透码)
    //time 时间
    let sqlCommunity = `create table if not exists users(
      uid int primary key auto_increment,
      account varchar(255),
      twitterAccount varchar(255),
      myReferralID varchar(255),
      state varchar(255),
      time varchar(255)
      )`;
    sqlArr.push(sqlCommunity);
       //用户表-TABLE
    //uid 自增id
    //masterReferralID邀请人的ID
    //lotteryNumbers 乐透号码
    //state 审核状态(0待审核 1审核通过(显示乐透号码） 4无效乐透码)
    //time 时间
    let sqlLotteryNumbers = `create table if not exists lotteryNumbers(
      uid int primary key auto_increment,
      masterReferralID varchar(255),
      lotteryNumbers varchar(255),
      fromAccount varchar(255),
      fromTwitter varchar(255),
      state varchar(255),
      time varchar(255)
      )`;
      sqlArr.push(sqlLotteryNumbers);         
  
  
//插入表格       
function insert_table(){

  con.connect(function(err) {

    if (err) throw err;

    console.log("Connected!");   

    let sql = sqlArr[i]; 
        
    //console.log(i,sqlArr[i],sqlArr.length);
    con.query(sql, function (err, results, fields) {

      if (err){
        return console.error('error: ' + err.message);
      }

      console.log("Table created success!");

    });
    //一次插入结束再执行下一次
    if(++i<sqlArr.length)insert_table();
  
    // con.end(function(err) {

    //   if (err) {
    //     return console.log(err.message);
    //   }
    
    // });

  });

   

}

insert_table();

