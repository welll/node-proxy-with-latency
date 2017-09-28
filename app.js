var http = require('http');
var httpProxy = require('http-proxy');
var colors = require('colors/safe');


// set single property 
var error = colors.red;
var delay = (x) => console.log(colors.green(x));
var info = (x) => console.log(colors.blue(x));

var HOST = "https://latest-iris.dev.frgcloud.com"
var PORT = 8888
var TIME_DELAY = 50000
var BLACK_LIST = [ 
"/static/0.1.8206/css/fanatics/sprites.css",
"/top-nav/0.1.8206/fanatics/script.js",
"/static/0.1.8206/css/fanatics/content_areas.css"
]


//
// Create a proxy server with latency
//
var proxy = httpProxy.createProxyServer();

//
// Create your server that makes an operation that waits a while
// and then proxies the request
//

function handleRequest(req,res) {
  proxy.web(req, res, {
      target: HOST,
      secure: false
    });
}

http.createServer(function (req, res) {
  
  const url = req.url
  info(`Handling ${url}`)
  	
  if ( BLACK_LIST.includes(url) ) {
    setTimeout( () => {
         delay(`Apply delay at ${url}`)
         handleRequest(req,res)
    }, TIME_DELAY)
    return;
  }

   handleRequest(req, res)

}).listen(PORT);

