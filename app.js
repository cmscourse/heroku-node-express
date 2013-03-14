
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, mongoose = require('mongoose')
, request = require('request');

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/mongo_test");

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/theme', routes.theme)
/*
app.get('/theme/:themeName', function(req,res){
  myTheme = req.route.params.themeName
  res.send('this theme is : ' + myTheme)
})
*/
app.get('/showview', function(req,res){
  res.render('theme')
})

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
