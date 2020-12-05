import './App.css';
import React, { useState}  from 'react'
import Authentication from './Authentication/Authentication'

function App() {
    const [isAuthenticated, SetisAuthenticated]= useState(false)
    const authProvider= new Authentication();
    console.log(authProvider.myMSALObj);
    const btnStyle = {
        background:"green",
        color:"white"
    }

    const handleSignIn = ()=> {
        authProvider.signIn()
            .then(response =>{
                if(response) console.log("through promise",response)
                authProvider.getTokenPopup(authProvider.loginRequest)
            })
        //         getTokenPopup(loginRequest)
        //   .then(response => {
        //     callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
        //     profileButton.classList.add('d-none');
        //     mailButton.classList.remove('d-none');
        //   }).catch(error => {
        //     console.log(error);
        //   });
    };
    return(
        <button type="button" style={btnStyle} onClick={handleSignIn}>Sign In</button>


    )
}

export default App;
