
const authConfig = {
  meEndpoint: '/icenna.user_api.auth.get_profile',
  signOnEndpoint: '/icenna.user_api.auth.new_login',
  storTokenKey: 'token',
  storAccessTokenKey: 'accessToken',
  storRefreshTokenKey: 'refreshToken',
  storUserKeyName: 'userData',
  onTokenExpiration: 'refreshToken',
};

export default authConfig;
