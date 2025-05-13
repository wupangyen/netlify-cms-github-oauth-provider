// server.js
const express = require('express');
const app = express();
const routes = require('./index');

const PORT = process.env.PORT || 3000;

app.get('/', routes.index);
app.get('/auth', routes.auth);
app.get('/callback', routes.callback);
app.get('/success', routes.success);
app.get('/debug', (req, res) => {
    res.send('✅ Server is running and responding');
  });

app.listen(PORT, () => {
  console.log(`✅ OAuth provider running on port ${PORT}`);
  console.log('Registered routes: /, /auth, /callback, /success');
});