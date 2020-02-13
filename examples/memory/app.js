const memorystore = require('./model');
const bodyParser = require('body-parser');
const express = require('express');
const OAuthServer = require('express-oauth-server');

// The express server port
const port = 3000;

// Dump memorystore content in console for each request
const dump = false;

const app = express();

// const memorystore = new Memorystore();
 
app.oauth = new OAuthServer({
  model: memorystore,
  continueMiddleware: dump,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(app.oauth.token());
// app.use(app.oauth.authenticate());
// app.use(app.oauth.authorize());


// returns access token after successfull authentication
app.post('/oauth/token', app.oauth.token());


app.get('/secret', app.oauth.authenticate(), (req, res) => {
  // Requires a valid access_token.
  res.send('Secret area');
});


app.get('/', (req, res) => {
  // Does not require an access token.
  res.send('Public area');
});

if (dump) {
  app.use(memorystore.expressDump);
}

app.listen(port, () => console.log(`Oauth test server is up and running on port ${port}`));