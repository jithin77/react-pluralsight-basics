const graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken) {
    const client = graph.Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });
    return client;
}

export async function getUserDetails(accessToken) {
    const client = getAuthenticatedClient(accessToken);
    const user = await client
        .api('/me')
        .select('id,displayName,givenName,mail,userPrincipalName,jobTitle,mobilePhone,officeLocation')
        .get();
    return user;
}

export async function getUserPhoto(accessToken){
    try{
        const client = getAuthenticatedClient(accessToken);
        const photo = await client
        .api('/me/photo/$value')
        .get()
        const url = window.URL || window.webkitURL;
        const blobUrl = await url.createObjectURL(photo);
        return blobUrl;
    }catch(err){
        return null
    }
}