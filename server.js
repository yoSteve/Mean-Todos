var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// import routes from routes directory
var index = require('./routes/index');
var todos = require('./routes/todos');

// View Engine
app.set('views', path.join(__dirname, 'views')); // use views directory
app.set('view engine', 'ejs');

// setup some middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api/v1', todos); // todos.js adds /todos to this route

app.listen(3000, function() {
    console.log('Server listening on port 3000...');
});