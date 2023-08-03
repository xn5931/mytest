const connection = require("./db.js");

const oklinkData = function(data){};
//burn_address  pledge_address sales_address

 oklinkData.create = (whereTable,valuesSql,result) => {
  //console.log("module层data02",data);
  var sqlCreate = "INSERT INTO "+whereTable;
  connection.query(sqlCreate+"(timeStamp,fromAddress,toAddress,amount,actionType,state,txId,inscriptionId) values"+valuesSql, data, (err, res) => {
    
    if (err) {result(err); console.log("oklink.module 1001error: ", err); return;}

    var resData = JSON.stringify(res);
        resData = JSON.parse(resData);  
    //console.log("show 1......",resData.affectedRows);
    if (res && resData.affectedRows == 1 ){

      //console.log("created ok",res);
      result({"created":"1"}); 
      return;
    }
    
    console.log("other errors 1002");
    return;

  });
};
// oklinkData.createBalance = (whereTable,valuesSql,result) => {
//   //console.log("module层createBalance",data);
//   var sqlCreate = "INSERT INTO "+whereTable;
//   connection.query(sqlCreate+"(id,address,token,balance,nowTime) values"+valuesSql, data, (err, res) => {
    
//     if (err) {result(err); console.log("oklink.module 1005error: ", err); return;}

//     var resData = JSON.stringify(res);
//         resData = JSON.parse(resData);  
//     console.log("show createBalance......",resData.affectedRows);
//     if (res && resData.affectedRows == 1 ){

//       //console.log("created ok",res);
//       result({"created":"1"}); 
//       return;
//     }
    
//     console.log("error 1002");
//     return;

//   });
// };

oklinkData.createAll = (whereTable,whatColumn,valuesSql,result) => {
  //console.log("module层createBalance",data);
  var sqlCreate = "INSERT INTO "+whereTable
  connection.query(sqlCreate+whatColumn+valuesSql, data, (err, res) => {
    
    if (err) {result(err); console.log("oklink.module 1005error: ", err); return;}

    var resData = JSON.stringify(res);
        resData = JSON.parse(resData);  
    //console.log("show createBalance......",resData.affectedRows);
    if (res && resData.affectedRows == 1 ){

      //console.log("created ok",res);
      result({"created":"1"}); 
      return;
    }
    
    console.log("error 1002");
    return;

  });
};

oklinkData.selectWhat = (whatColumn,whereTable,whatValues,result) => {
 
  var selectWhatsql = "SELECT "+whatColumn+" FROM "+whereTable+" WHERE "+whatColumn+"='"+whatValues+"'";
   console.log("selectWhatsql.........",selectWhatsql);
  connection.query(selectWhatsql, data, (err, res) => {
    
    //存在错误 返回错误代码
    if (err) {result(err); console.log("oklink.module 1003error: ", err); return;}

    var resData = JSON.stringify(res);
        resData = JSON.parse(resData);  
    //console.log("show 2 查询到的数据长度 resData.length === ",resData.length);
    if (resData.length>1) {console.log("selectWhatsql数据获取错误,存在多条相同数据,请核验数据库",resData);}
    if (res && resData.length == 0 ){

      //console.log("non-existent",查询susscee);
      result({values:0}); 
      return;
    
    }else{
     
     console.log("Already exists susscee 102");
      result({values:1}); 
      return;

    }
    
    console.log("selectWhat.model error 1004");
    return;

  });
};

oklinkData.selectWhatBoth = (whereTable,whatColumnOne,whatValuesOne,whatColumnTwo,whatValuesTwo,result) => {
 
  var selectWhatsql = "SELECT *FROM "+whereTable+" WHERE "+whatColumnOne+"='"+whatValuesOne+"' AND "+whatColumnTwo+"='"+whatValuesTwo+"'";
    //console.log(" selectWhatBoth SQL.........",selectWhatsql);
  connection.query(selectWhatsql, data, (err, res) => {
    
    //存在错误 返回错误代码
    if (err) {result(err); console.log("oklink.module 1003error: ", err); return;}

    var resData = JSON.stringify(res);
        resData = JSON.parse(resData);  
    //console.log("show 2 查询到的数据长度 resData.length === ",resData,resData.length);
    if (resData.length>1) {console.log("selectWhatsql数据获取错误,存在多条相同数据,请核验数据库",resData);}
    if (res && resData.length == 0 ){

      console.log("non-existent 不存在数据 查询susscee");
      result({values:0}); 
      return;
    
    }else{
     
     console.log("Already exists susscee 102");
      result({values:1}); 
      return;

    }
    
    console.log("selectWhat.model error 1004");
    return;

  });
};

oklinkData.updateByRow = (whereTable,setWhatOne,setValuesOne,setWhatTwo,setValuesTwo,whatColumnOne,whatValuesOne,whatColumnTwo,whatValuesTwo,result) => {
  connection.query(
    "UPDATE "+whereTable+" SET "+setWhatOne+" = '"+setValuesOne+"',"+ setWhatTwo+" = '"+setValuesTwo+"' WHERE "+whatColumnOne+ "='"+whatValuesOne+"' AND "+whatColumnTwo+"='"+whatValuesTwo+"'",
    (err, res) => {
    //存在错误 返回错误代码
    if (err) {result(err); console.log("oklink.module updateByRow 1003error: ", err); return;}
      
    var resData = JSON.stringify(res);
        resData = JSON.parse(resData);  
    //console.log("show 更新的数据 ",resData.affectedRows);
    if (resData.length>1) {console.log("selectWhatsql数据获取错误,存在多条相同数据,请核验数据库",resData);}
    if (res && resData.affectedRows == 1 ){

      //console.log("update susscee 返回1");
      result({values:1}); 
      return;
    
    }else{
     
     console.log("存在错误",resData);
      return;

    }
    
    console.log("updateByRow error 1004");
    return;
    }
  );
};

 module.exports = oklinkData;
