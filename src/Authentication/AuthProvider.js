import React from 'react';
import {PublicClientApplication} from '@azure/msal-browser';
import {msalConfig,authScope,userScope} from '../Authentication/AuthenticationConfig';
import {getUserDetails,getUserPhoto} from './GraphService';
import { Providers,SimpleProvider } from '@microsoft/mgt';
import axios from 'axios';


export default function withAuthProvider(WrappedComponent) {
    return class extends React.Component {
        publicClientApplication;
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                isAuthenticated: false,
                user: {},
                accounts:{},
                userPhoto:null
            };
            // Initialize the MSAL application object
            this.publicClientApplication = new PublicClientApplication(msalConfig)
        }

        componentDidMount() {
            // If MSAL already has an account, the user
            // is already logged in
            const accounts = this.publicClientApplication.getAllAccounts();
            
            if (accounts && accounts.length > 0) {
                this.setState({accounts:accounts[0]}, this.initializeSimpleProvider);
                // Enhance user  object with data from Graph
                this.getUserProfile();
            }
        }



        render() {
            console.log("hoc",this.state)
      
              return <WrappedComponent
                    error={this.state.error}
                    isAuthenticated={this.state.isAuthenticated}
                    user={this.state.user}
                    login={() => this.login()}
                    logout={() => this.logout()}
                    getAccessToken={(scopes) => this.getAccessToken(scopes)}
                    setError={(message, debug) => this.setErrorMessage(message, debug)}
                    userPhoto={this.state.userPhoto}                
                    {...this.props} />
        }

        async login() {
            try {
                await this.publicClientApplication.loginPopup(authScope);
                this.setState({accounts:this.publicClientApplication.getAllAccounts()[0]},this.initializeSimpleProvider)
                await this.getUserProfile();
                await this.getUserPicture();
            } catch (err) {
                this.setState({
                    isAuthenticated: false,
                    user: {},
                    error: this.normalizeError(err)
                });
            }
        }

        logout() {
            this.publicClientApplication.logout();
        }

        async getAccessToken(scopes) {
            console.log("access token scope", scopes)
            const accounts = this.publicClientApplication
            .getAllAccounts();
            let accessRequest = {
                scopes: scopes,
                account: accounts[0]
            }
           
            try {
               //if (accounts.length <= 0) throw new Error('login_required');
                // Get the access token silently
                // If the cache contains a non-expired token, this function
                // will just return the cached token. Otherwise, it will
                // make a request to the Azure OAuth endpoint to get a token
                let silentResult;
                if(process.env.NODE_ENV === "production"){
                    accessRequest["loginHint"]= await this.getCurrentUser();
                    const testAccount = this.publicClientApplication
                    .getAccountByUsername(await this.getCurrentUser());
                    console.log("test Account",testAccount)
                    silentResult = await this.publicClientApplication
                    .ssoSilent(accessRequest);
                    await this.getUserProfile();
                    await this.getUserPicture();
                 }else if (process.env.NODE_ENV === "development"){
                     silentResult = await this.publicClientApplication
                    .acquireTokenSilent(accessRequest);
                 }
                
                console.log("accessRequest try",accessRequest)


                return silentResult.accessToken;
            } catch (err) {
                // If a silent request fails, it may be because the user needs
                // to login or grant consent to one or more of the requested scopes
                console.log("accessRequest catch",accessRequest)
                if (this.isInteractionRequired(err)) {
                    var interactiveResult = await this.publicClientApplication
                        .acquireTokenPopup(accessRequest);

                    return interactiveResult.accessToken;
                } else {
                    throw err;
                }
            }
        }
        async getUserProfile() {
            try {
                var accessToken = await this.getAccessToken(userScope.scopes);

                if (accessToken) {
                    // Get the user's profile from Graph
                    var user = await getUserDetails(accessToken);
                    this.setState({
                        isAuthenticated: true,
                        user: {
                            userID:user.id,
                            displayName: user.displayName,
                            email: user.mail,
                            userPrincipalName:user.userPrincipalName,
                            givenName:user.givenName,
                            jobTitle:user.jobTitle,
                            mobilePhone:user.mobilePhone,
                            officeLocation:user.officeLocation
                        },
                        error: null
                    });
                }
            } catch (err) {
                this.setState({
                    isAuthenticated: false,
                    user: {},
                    error: this.normalizeError(err)
                });
            }
        }

        async getUserPicture() {
          
                var accessToken = await this.getAccessToken(userScope.scopes);
               
                if (accessToken) {
                    // Get the user's photo from Graph
                    var userPhoto = await getUserPhoto(accessToken);
                    
                    this.setState(prevState=>{
                        return {
                            ...prevState,
                            userPhoto:userPhoto 
                        }
                                             
                    });
                }
        }

        initializeSimpleProvider() {

            let myProvider = new SimpleProvider( async(scopes) => {
            const accountObj = this.state.accounts;
            console.log("scopes passed by people picker", scopes)
              let request = {
                scopes: scopes,
                account:accountObj
              };
              try {
                let response = await this.publicClientApplication.acquireTokenSilent(request);
                return response.accessToken;
              } catch (error) {
                if (this.isInteractionRequired(error.errorCode)) {
                  this.publicClientApplication.acquireTokenRedirect(request);
                }
            }});
        
            Providers.globalProvider = myProvider;
          }

        setErrorMessage(message, debug) {
            this.setState({
                error: {
                    message: message,
                    debug: debug
                }
            });
        }

        normalizeError(error) {
            var normalizedError = {};
            if (typeof (error) === 'string') {
                var errParts = error.split('|');
                normalizedError = errParts.length > 1 ? {
                    message: errParts[1],
                    debug: errParts[0]
                } : {
                    message: error
                };
            } else {
                normalizedError = {
                    message: error.message,
                    debug: JSON.stringify(error)
                };
            }
            return normalizedError;
        }

        isInteractionRequired(error) {
         
            if (!error.message || error.message.length <= 0) {
                return false;
            }

            return (
                error.message.indexOf('consent_required') > -1 ||
                error.message.indexOf('interaction_required') > -1 ||
                error.message.indexOf('login_required') > -1 ||
                error.message.indexOf('no_account_in_silent_request') > -1
            );
        }

        getCurrentUser(){               
            return new Promise((resolve,reject)=>{
                axios.get(`/../_api/web/currentuser`)
                .then(res => {
                    resolve(res.data.UserId.NameId)
                })
            })
        }
    }
}