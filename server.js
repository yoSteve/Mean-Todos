const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// import routes from routes directory
const index = require('./routes/index');
const todos = require('./routes/todos');

// View Engine
// app.set('views', path.join(__dirname, 'views')); // use views directory
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);



// setup some middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Tell Express where to find our clientside code
app.use(express.static(path.join(__dirname, 'client/src')));

// app.use('/', index);
app.use('/api/v1', todos); // todos.js adds /todos to this route

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));