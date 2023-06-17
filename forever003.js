  const oklinkModel = require("../src/models/oklink.model.js");
  const newDate = require("../lib/date.js");
  const https = require('https');  // 引入 HTTPS 模块
  var i = 0;

  //查询代币转账列表 根据地址、交易hash、区块高度 查询转账列表
  //HTTP请求 GET /api/v5/explorer/btc/transaction-list
  function Ajax(){

    //需要get请求的地址
    var addressArr = [];
    //bc1quwwkek3uhxaytwp0nh52ft2d7mlke99kx62j2x 测试地址 用户001
    //let addressTest = "bc1quwwkek3uhxaytwp0nh52ft2d7mlke99kx62j2x";
    //addressArr.push(addressTest);
    //bc1qtdl3r6p8zl83x30pdjn6ps7m2av46y7fnh9e9p admin售卖地址
    let salesAddress = "bc1qtdl3r6p8zl83x30pdjn6ps7m2av46y7fnh9e9p";
        addressArr.push(salesAddress);
    //1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa 销毁地址--中本聪创世区块
    let burnAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
        addressArr.push(burnAddress);
    //bc1qf004w2lssg3mnc9apsl6zhnsztgjdd357wtg4e 质押锁仓生息地址
    let pledgeAddress = "bc1qf004w2lssg3mnc9apsl6zhnsztgjdd357wtg4e";
        addressArr.push(pledgeAddress);

    //console.log("i value",i);

    let getAddress = "";
        getAddress = addressArr[i];
    //console.log(getAddress);

    const req = https.request({
      hostname: 'chain.api.btc.com',
      //path:'/api/v5/explorer/address/unspent?chainShortName=BTC?address='+getAddress,
      path:'/v3/address/'+getAddress,
      //headers:{'Ok-Access-Key': '5dc5b336-78c9-449b-87fa-8c47662dc314'},
      target:'127.0.0.1',
      port: 443,
      method: 'GET'
    }, res => {
      // 如果状态码不是 200 就输出状态码
      if (res.statusCode !== 200) console.log(res.statusCode);

      res.on('data', d => {
        //根据地址插入不同的表格
        var whereTable = "btc_bgas_balance";
        //if(getAddress == salesAddress ){whereTable = 'sales_address';}
        d = JSON.stringify(d);
        console.log("d...1",d);

        // 把接收到的内容转为字符串在控制台输出
        //d = JSON.parse(d.toString());
        console.log("d...2",typeof d);
        //return;
        data = d.data;
              console.log("data......",typeof data,data[0]);
        //id,address,token,balance,nowTime
        console.log("数组里面多少个值",data.length);
        
        for(const v of data){
          //console.log("for 遍历出所有的值1",v);
          //console.log("某一个值",v.amount);
          //select balance from btc_bgas_balance where balance =" ";
          //查询当前这条数据的  通过表内查询确定是否存在 && 存在更新 不存在插入
          var whatColumnOne = "token";
          var whatValuesOne = v.token;
          var whatColumnTwo = "address";
          var whatValuesTwo = getAddress;
          var n = Date.now();

          function getData(n) {
            let now = new Date(n),
              y = now.getFullYear(),
              m = now.getMonth() + 1,
              d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
          }
          var nowDate =getData(n);//'2022-1-18 10:09:06'
          //var nowDate = newDate.getDtae(n);
          //console.log("whatValues...",whereTable,whatColumnOne,whatValuesOne,whatColumnTwo,whatValuesTwo,nowDate);

          //只插入交易类型是 transfer 的数据
          //console.log(v.actionType);
          //if (v.actionType !== "transfer") {return 0;} 
          //查询v数据是否存在
          oklinkModel.selectWhatBoth(whereTable,whatColumnOne,whatValuesOne,whatColumnTwo,whatValuesTwo,(SelectResData) => {
            //console.log("Select resData 返回的数据 0或者1.......",SelectResData.values);
            
            if (SelectResData.values === 1) {
              //console.log("values ==1 Already exists this data");
              //已经存在 更新数据
              var setWhatOne = "balance";
              var setValuesOne = v.balance;
              var setWhatTwo = "nowTime";
              var setValuesTwo= nowDate;
              var whatColumnOne = "address";
              var whatValuesOne = getAddress;
              var whatColumnTwo = "token";
              var whatValuesTwo = v.token;
              oklinkModel.updateByRow(whereTable,setWhatOne,setValuesOne,setWhatTwo,setValuesTwo,whatColumnOne,whatValuesOne,whatColumnTwo,whatValuesTwo, (resData) => {
                //console.log("更新返回的结果",resData)
                if(resData.values === 1){console.log("btc_bgas_balance update susscee!");return;}

              });
            }else if (SelectResData.values === 0){
              //不存在数据 执行插入创建这条数据
                var whatColumn = "(address,token,balance,nowTime) values";
                var valuesSql = "('"+getAddress+"'"+",'"+v.token+"'"+",'"+v.balance+"'"+",'"+nowDate+"')";

                  //console.log("组合的数据。。。。",typeof valuesSql,valuesSql);
                  oklinkModel.createAll(whereTable,whatColumn,valuesSql, (resData) => {

                          //console.log("oklinkModel返回的数据resdata 102",resData);
                          console.log("susscee",resData);
                });

            }else{
              console.log("values 不是0和1 createAll err1001",SelectResData);
            }
            return;
         
          }); 
        }
        });
    });

    // 如果出错就输出错误信息
    req.on('error', err => {
      console.log(err);
    });
    // 结束
    req.end();  
    //继续下一个ajax请求
    if(++i<addressArr.length)Ajax(); 
  }
  Ajax();

//setInterval(foreverRun,10000);//30秒




