let redirectUrl = 'http://localhost:3000';
if(process.env.NODE_ENV === "production"){
    redirectUrl='https://dmcs-dev.itfc-idb.org/apps/Memo/Pages/Test-Authentication.aspx'
}

export const msalConfig= { 
        auth: {
            clientId: "8a17f110-fe17-4594-9463-ffc39da24b9c",
            authority: 'https://login.microsoftonline.com/ec9121b6-25f6-408f-9fba-c760737450ab',
            redirectUri: redirectUrl
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: true
        }  
}


export const authScope ={
    scopes: ["openid", "profile", "User.Read"]
}

export const userScope ={
    scopes: [ "User.Read"]
}


