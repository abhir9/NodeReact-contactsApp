var express = require('express'),
    persons = require('./routes/persons'),
    chats = require('./routes/chats'),
    bodyParser = require('body-parser'),
    app = express();

app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/* persons routes*/
app.get('/persons', persons.findAll);
app.get('/persons/:id', persons.findById);
/* chat routes*/
app.get('/chats', chats.findAll);
app.post('/chats', chats.sendChat);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});