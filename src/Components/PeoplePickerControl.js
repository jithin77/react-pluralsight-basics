
import { PeoplePicker } from '@microsoft/mgt-react';
import React, { Component } from 'react'
import { Providers, ProviderState,SimpleProvider } from '@microsoft/mgt';
export default class PeoplePickerControl extends Component {

    componentDidMount(){
        Providers.globalProvider.setState(ProviderState.SignedIn);
    }
     selectedPeople = [
        {
          "@odata.type": "#microsoft.graph.user",
          "id": "9a6095d5-208a-4664-a369-1e4728dcebb4",
          "businessPhones": [],
          "displayName": "Osman Tayeb",
          "givenName": "Osman",
          "jobTitle": null,
          "mail": "Otayeb@isdbdev.org",
          "mobilePhone": null,
          "officeLocation": null,
          "preferredLanguage": null,
          "surname": "Tayeb",
          "userPrincipalName": "Otayeb@isdbdev.org",
          "isFocused": true
        }
      ]

      handlePeopleChange= (e)=>{
            console.log("people picker", e)
      }
    render() {
        return (
            <>
            <p>People Picker</p>
            <PeoplePicker 
              selectionMode="multiple" 
              showMax="3"
              selectionChanged={this.handlePeopleChange}
              // groupId="75ed7dae-71b6-4360-a303-22587de92f56"
              // selectedPeople={selectedPeople}
              ></PeoplePicker>
          </>
        )
    }
}

