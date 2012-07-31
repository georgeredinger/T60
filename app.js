
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
	, geoip = require('geoip');

var app = express();
var ip=0;
var options = {
	 host: 'ifconfig.me',
	 port: 80,
	 path: '/ip',
	 method: 'GET'
};

 var req = http.get(options, function(res) {
	 var pageData = "";
	 res.setEncoding('utf8');
	 res.on('data', function (chunk) {
		 pageData += chunk;
	 });

	 res.on('end', function(){
		 console.log(pageData);
		 ip=pageData;
	 });
 });			 

app.configure(function(){
  app.set('port', process.env.PORT || 2261);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/',function(req,res){
   res.render('index', {title:'T60',ip: ip });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
