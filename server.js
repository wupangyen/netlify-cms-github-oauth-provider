// server.js
const express = require('express');
const app = express();
const routes = require('./index');

const PORT = process.env.PORT || 3000;

app.get('/', routes.index);
app.get('/auth', routes.auth);
app.get('/callback', routes.callback);
app.get('/success', routes.success);

app.listen(PORT, () => {
  console.log(`✅ OAuth provider running on port ${PORT}`);
});