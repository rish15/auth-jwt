const express = require('express');
const bodyParser = require('body-parser');
const server = require('./routes/server');
const token = require('./routes/token')
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

app.get('/', server.serverCheck);
app.post('/login',token.token);

//middleware
app.use(require('./routes/tokenChecker'));

//protected routes
app.get('/dashboard',server.dashboard);




















app.listen(23000, () =>{
  console.log('server runnning on post 23000');
})
