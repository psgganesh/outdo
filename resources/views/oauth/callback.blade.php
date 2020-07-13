<html>
<head>
  <meta charset="utf-8">
  <title>{{ config('app.name') }}</title>
  <script>
    window.opener.postMessage({ 
      token: "{{ $token }}", 
      oauthToken: "{{ $oauth_token }}",
      refreshToken: "{{ $oauth_refresh_token }}"
    }, "{{ url('/') }}")
    window.close()
  </script>
</head>
<body>
</body>
</html>
