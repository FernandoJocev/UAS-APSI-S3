const token =
  localStorage.getItem('oauth_token')! || localStorage.getItem('token')! || null

export default token
