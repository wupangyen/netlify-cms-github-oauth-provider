module.exports = (oauth2, oauthProvider) => {
  async function callbackMiddleWare(req, res, next) {
    const code = req.query.code;
    let options = { code };

    if (oauthProvider === 'gitlab') {
      options.client_id = process.env.OAUTH_CLIENT_ID;
      options.client_secret = process.env.OAUTH_CLIENT_SECRET;
      options.grant_type = 'authorization_code';
      options.redirect_uri = process.env.REDIRECT_URL;
    }

    try {
      const result = await oauth2.getToken(options);
      const token = oauth2.createToken(result);
      
      // ✅ Redirect back to the GitHub Pages CMS admin panel
      return res.redirect('https://wupangyen.github.io/pang-blog-minimal-mistakes-theme-githubpages/admin');
    } catch (error) {
      console.error('Access Token Error', error.message);
      return res.send('Authentication failed. Please try again.');
    }
  }

  return callbackMiddleWare;
};