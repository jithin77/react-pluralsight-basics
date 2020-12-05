import * as msal from "@azure/msal-browser";

export default class Authentication  {
    constructor(){
        this.myMSALObj  = new msal.PublicClientApplication(this.msalConfig);
    }
    homeAccountId=null
    msalConfig= {
        auth: {
          clientId:'8a17f110-fe17-4594-9463-ffc39da24b9c',
          authority:'https://login.microsoftonline.com/ec9121b6-25f6-408f-9fba-c760737450ab',
          redirectUri: 'http://localhost:3000'
        },
        cache: {
          cacheLocation: "sessionStorage",
          storeAuthStateInCookie: false
        }
      }

    loginRequest = {
        scopes: ["openid", "profile", "User.Read"]
      };

    signIn() {
      return new Promise((resolve,reject)=>{
        this.myMSALObj.loginPopup(this.loginRequest)
        .then(loginResponse => {
          //console.log('id_token acquired at: ' + new Date().toString());
          resolve(loginResponse)
        }).catch(error => {
          console.log(error);
        });
      }) 
      }

      async getTokenPopup(request) {
        return this.myMSALObj.acquireTokenSilent(request)
          .catch(error => {
            console.log(error);
            console.log("silent token acquisition fails. acquiring token using popup");
      
            // fallback to interaction when silent call fails
              return this.myMSALObj.acquireTokenPopup(request)
                .then(tokenResponse => {
                  return tokenResponse;
                }).catch(error => {
                  console.log(error);
                });
          });
      }
}
