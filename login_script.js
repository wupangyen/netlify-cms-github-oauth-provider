module.exports = (oauthProvider, message, content) => `
<script>
(function() {
  try {
    if (window.opener) {
      window.opener.postMessage(
        'authorization:${oauthProvider}:${message}:${JSON.stringify(content)}',
        '*'
      );
      window.close();
    } else {
      console.warn('No window.opener detected.');
      document.body.innerText = 'Login successful. Please return to the original tab.';
    }
  } catch (e) {
    console.error('OAuth script error:', e);
    document.body.innerText = 'Login failed. Please close this window.';
  }
})();
</script>
`;