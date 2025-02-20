import config from '../config.json'

export default {
  meEndpoint: `${config.SERVER_URL}/api/loggedInUser`,
  
  //THEME SETTING
  //loginEndpoint: '/jwt/login',
  //MY MODIFICATION
  loginEndpoint: `${config.SERVER_URL}/api/login`,
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
