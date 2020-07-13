import Cookies from 'js-cookie'
import store from '~/store'
import axios from 'axios'

export default async (to, from, next) => {
  const BITBUCKET_REFRESH_TOKEN_URL = `https://bitbucket.org/site/oauth2/access_token`

  const oauthToken = Cookies.get('oauthToken')
  const refreshToken = Cookies.get('refreshToken')
  if (typeof (oauthToken) === 'undefined') {
    /**
     * https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/
     * curl -X POST -u "client_id:secret" https://bitbucket.org/site/oauth2/access_token -d grant_type=refresh_token -d refresh_token={refresh_token}
     */
    console.log('oauth_token has expired, need to re-factor this to send refresh token and get new token')

    const clientId = process.env.MIX_BITBUCKET_CLIENT_ID
    const secret = process.env.MIX_BITBUCKET_CLIENT_SECRET

    const result = await fetch(`${BITBUCKET_REFRESH_TOKEN_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${clientId}:${secret}`)
      },
      body: 'grant_type=refresh_token&refresh_token=' + refreshToken
    })

    console.log(result)

    await axios.post(`${BITBUCKET_REFRESH_TOKEN_URL}`, {
      grant_type: 'refresh_token',
      refresh_token: `${refreshToken}`
    }, {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${clientId}:${secret}`)
    }).then(function (response) {
      /**
       * Get the new token and commit in the oauth_token
       */
      console.log(response)
      /**
       * this.$store.dispatch('auth/saveRefreshedToken', {
       *    oauthToken: response.data.oauth_token
       * })
       */
    }).catch(function (error) {
      console.log(error)
    })
  }
  const bbClient = store.getters['bitbucket/client']
  if (bbClient === null) {
    await store.dispatch('bitbucket/setup', { oauthToken: oauthToken })
  }

  next()
}
