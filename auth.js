const randomstring = require('randomstring');

module.exports = (oauth2) => {
  return (req, res, next) => {
    const authorizationUri = oauth2.authorizeURL({
      redirect_uri: process.env.REDIRECT_URL, // use correct snake_case key
      scope: process.env.SCOPES || 'repo,user',
      state: randomstring.generate(32)
    });

    res.redirect(authorizationUri);
  };
};
