const generateScript = require('./login_script.js')

module.exports = (oauth2, oauthProvider) => {
  async function callbackMiddleWare(req, res, next) {
    const code = req.query.code
    let options = { code }

    if (oauthProvider === 'gitlab') {
      options.client_id = process.env.OAUTH_CLIENT_ID
      options.client_secret = process.env.OAUTH_CLIENT_SECRET
      options.grant_type = 'authorization_code'
      options.redirect_uri = process.env.REDIRECT_URL
    }

    try {
      const result = await oauth2.getToken(options)
      const token = oauth2.createToken(result)
      const content = {
        token: token.token.token.access_token,
        provider: oauthProvider
      }
      const script = generateScript(oauthProvider, 'success', content)
      return res.send(script)
    } catch (error) {
      console.error('Access Token Error', error.message)
      const script = generateScript(oauthProvider, 'error', JSON.stringify(error))
      return res.send(script)
    }
  }

  return callbackMiddleWare
}