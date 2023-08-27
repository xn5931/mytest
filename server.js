const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const api =require("./routes/tutorial.routes.js");
const app = express();

var corsOptions = {
  // origin: "https://mmmfi.app:8081"
  origin: "localhost:8081"

};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */
app.all("*",function(req,res,next){
    //输出请求参数
    let data=''
    if (req.method==='GET'){
        data=JSON.stringify(req.query)
    }else {
        data=JSON.stringify(req.body)
    }
    console.log(`${req.path} : ${data}`)

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    // 设置返回数据格式为json
    res.header('Content-Type', 'application/json')
    if (req.method.toLowerCase() === 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require("./routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
