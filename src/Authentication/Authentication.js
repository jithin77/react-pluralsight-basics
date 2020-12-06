import * as msal from "@azure/msal-browser";
import { Providers, ProviderState,SimpleProvider } from '@microsoft/mgt';
import axios from 'axios'
import react from 'react'

export default class Authentication extends react.Component{
  constructor() {
    super();
    this.myMSALObj = new msal.PublicClientApplication(this.msalConfig);
  }
  homeAccountId = null
  msalConfig = {
    auth: {
      clientId: '8a17f110-fe17-4594-9463-ffc39da24b9c',
      authority: 'https://login.microsoftonline.com/ec9121b6-25f6-408f-9fba-c760737450ab',
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
    return new Promise((resolve, reject) => {
      this.myMSALObj.loginPopup(this.loginRequest)
        .then(loginResponse => {
          //console.log('id_token acquired at: ' + new Date().toString());        
          this.initializeSimpleProvider(loginResponse.account);
          resolve(loginResponse)
        }).catch(error => {
          console.log(error);
        });
    })
  }

  signOut() {
    this.myMSALObj.logout();
  }

  initializeSimpleProvider(accountObj) {

    let myProvider = new SimpleProvider( async(scopes) => {
      let request = {
        scopes: scopes,
        account:accountObj
      };
      try {
        let response = await this.myMSALObj.acquireTokenSilent(request);
        return response.accessToken;
      } catch (error) {
        if (this.requiresInteraction(error.errorCode)) {
          this.myMSALObj.acquireTokenRedirect(request);
        }
    }}, this.signIn, this.signOut);

    Providers.globalProvider = myProvider;
    Providers.globalProvider.setState(ProviderState.SignedIn)
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

  requiresInteraction(errorCode) {
        if (!errorCode || !errorCode.length) {
            return false;
        }
        return errorCode === "consent_required" ||
            errorCode === "interaction_required" ||
            errorCode === "login_required";
    }

  callMSGraph(accessToken) {
    return new Promise((resolve, reject) => {
      axios.get('https://graph.microsoft.com/v1.0/me/', {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        })
        .then(function (response) {
          // handle success
          //console.log("See Profile response",response);
          resolve(response.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });


    })

  }
}