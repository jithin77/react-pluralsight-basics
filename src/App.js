import './App.css';
import React, { useState,useEffect}  from 'react'
import Authentication from './Authentication/Authentication'
import Profile from './Components/Profile'
import PeoplePickerControl from './Components/PeoplePickerControl'


const btnSignInStyle = {
        background:"green",
        color:"white",
        padding:"15px",
        margin:"10px"
}
    const btnSignOutStyle = {
        background:"red",
        color:"white",
        padding:"15px", 
        margin:"10px"
    }

    const btnProfileStyle = {
        background:"yellow",
        color:"black",
        padding:"15px", 
        margin:"10px"
    }

    
function App() {

    const [isAuthenticated, SetisAuthenticated]= useState(false)
    const [profileAccessToken, SetProfileAccessToken] = useState('')
    const [userInfo, setUserInfo] = useState(null)
    const profileRequest = {
        scopes: ["User.Read"],
        account:null
    };
    const authProvider= new Authentication();

    useEffect(()=>{

        const accounts = authProvider.myMSALObj.getAllAccounts();

        if (accounts && accounts.length > 0) {
            // Enhance user object with data from Graph
            profileRequest.account=accounts[0]
        authProvider.getTokenPopup(profileRequest)
        .then( accessTokenResponse => {
            SetProfileAccessToken(accessTokenResponse.accessToken)
            SetisAuthenticated(true)
            authProvider.initializeSimpleProvider(accounts[0])
        
        })
        .catch(err => SetisAuthenticated (false))
        }

    },[])


    const handleSignIn = ()=> {
        authProvider.signIn()
            .then(response =>{
                if(response) {
                    console.log("through promise",response)
                    SetisAuthenticated(true)
                    SetProfileAccessToken(response.accessToken)
                    // silentRequest.account=response.account
                    // authProvider.getTokenPopup(silentRequest)
                    // .then(tokenResponse =>{
                    //     console.log("token response", tokenResponse)
                    //     SetProfileAccessToken(tokenResponse.accessToken)
                    // } )
                }
            })
    };

    const getUserProfile = ()=>{
        authProvider.callMSGraph(profileAccessToken)
        .then(userData => {
            console.log("user data", userData)
            setUserInfo(userData)
        })
    }


    const handleLogout = ()=>{
        authProvider.signOut();
    }

    const userProfileMarkup = userInfo !== null ? <Profile userInfoData={userInfo}/>:null

    return(
        <>
            {isAuthenticated===false?<div><button type="button" style={btnSignInStyle} onClick={handleSignIn}>Sign In</button></div>:
            <>
            <div>
                <button type="button" style={btnSignOutStyle} onClick={handleLogout}>Sign Out</button> 
            </div>
            <div>
                <button type="button" style={btnProfileStyle} onClick={getUserProfile}>View Profile</button>
            </div>
            {userProfileMarkup}
            <PeoplePickerControl authObj={authProvider}/>
            </>
            }
            
        </>

    )
}

export default App;
