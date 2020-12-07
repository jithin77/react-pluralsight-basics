import React from 'react'
import { MsalProvider, Providers } from '@microsoft/mgt';
import { Login,PeoplePicker } from '@microsoft/mgt-react';

export default function NormalPP(){
    Providers.globalProvider = new MsalProvider({
        clientId: '8a17f110-fe17-4594-9463-ffc39da24b9c'
      });
    return(
        <div className="App">
            <header>
                <Login />
            </header>
            <PeoplePicker/>
        </div>

    )
}