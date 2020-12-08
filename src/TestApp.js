import React from 'react'
import withAuthProvider from './Authentication/AuthProvider'

function TestApp(props) {

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

    console.log("Properties from hoc", props)
    return(
        
        <>
            <button type="button" style={btnSignInStyle} onClick={props.login}>Sign In</button>
            <div>
                <button type="button" style={btnSignOutStyle} onClick={props.logout}>Sign Out</button>
            </div>
        </>
    )


}

export default withAuthProvider(TestApp);