let redirectUri;
if (process.env.NODE_ENV === 'production') {
  redirectUri = 'https://dmcs-dev.itfc-idb.org/apps/Memo/Pages/Test-Authentication.aspx';
} else if (process.env.NODE_ENV === 'development') {
  redirectUri = 'http://localhost:3000';
}

export const msalConfig = {
  auth: {
    clientId: '8a17f110-fe17-4594-9463-ffc39da24b9c',
    authority: 'https://login.microsoftonline.com/ec9121b6-25f6-408f-9fba-c760737450ab',
    redirectUri: redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const authScope = {
  scopes: ['openid', 'profile', 'User.Read'],
  state: window.location.href,
};

export const userScope = {
  scopes: ['User.Read'],
  state: window.location.href,
};
