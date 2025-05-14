module.exports = (oauthProvider, message, content) => `
<script>
(function() {
  try {
    window.opener.postMessage(
      'authorization:${oauthProvider}:${message}:${JSON.stringify(content)}',
      '*'
    );
    window.close();
  } catch (e) {
    console.error('OAuth script error:', e);
    document.body.innerText = 'Login failed. Please close this window.';
  }
})();
</script>
`; 