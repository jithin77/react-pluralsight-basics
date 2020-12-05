export const msalconfig = {
        auth: {
            clientId: "Enter the Client Id (aka 'Application ID')",
            authority: "https://login.microsoftonline.com/common",
            redirectUri: "http://localhost:3000"
        },
        cache: {
            cacheLocation: "localStorage", 
            storeAuthStateInCookie: true 
        },
}

export const loginRequest = {
    scopes: ["openid", "profile", "offline_access"]
}