var express = require('express'),
  request = require('request');

var app = express();
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-Authorization'
  );
  next();
});

app.all('*', function(req, res) {
  var url = 'http://backend.bisatopup.co.id' + req.url;
  req
    .pipe(request(url))
    .on('error', function(err) {
      console.log("asasasa",err);
      res.status(401).json({
        error: true,
        message: 'Terjadi error pada serverr'
      });
    })
    .pipe(res);
});

console.log(`Starting at port ${port}...`);

app.listen(port);
