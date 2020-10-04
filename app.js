const express = require('express')
const app = express();
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html'); // clean code 를 위한 미들웨어
const bodyParser = require('body-parser');
const compression = require('compression');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);

//app.get('/', (req, res) => res.send('Hello World!'))

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});
   
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});