export const msalConfig= { 
        auth: {
            clientId: "8a17f110-fe17-4594-9463-ffc39da24b9c",
            authority: 'https://login.microsoftonline.com/ec9121b6-25f6-408f-9fba-c760737450ab',
            redirectUri: window.location.href
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: false
        }
}


export const authScope ={
    scopes: ["openid", "profile", "User.Read"]
}

export const userScope ={
    scopes: [ "User.Read"]
}


