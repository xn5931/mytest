
/*
 * 时间戳格式化函数 
 * @param  {string} format    格式 
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
 * @return {string}           格式化的时间字符串 
 */
module.exports.ymd=function(timestamp){

    function add0(m){return m<10?'0'+m:m }//时间戳转化成时间格式

    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var dasd = year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
    
    return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);             
}

//其他时区转换成->东8区的年月日
module.exports.UTC8ymd=function(time){

   var date = new Date(time);
   var newTime = Date.parse(date);
  
    return newTime;             
}

module.exports.onlymd=function(timestamp){

    function add0(m){return m<10?'0'+m:m }//时间戳转化成时间格式

    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var dasd = year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
    
    return add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes);             
}



