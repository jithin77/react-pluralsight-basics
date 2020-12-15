import { PeoplePicker } from '@microsoft/mgt-react';
import React, { Component } from 'react'
import { Providers, ProviderState } from '@microsoft/mgt';
import UserList from './UserList'
//import './test.css'



export default class PeoplePickerControl extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedUsers:[]
    }
  }

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
            const selectedUsers = e.target.selectedPeople;
            this.setState({
              selectedUsers
            })
      }

      deleteUserFromPeoplePicker(userID){
        console.log("lifted up state", userID);
        let usersCopy = [...this.state.selectedUsers]
        console.log("usersCopy initial",usersCopy)
        usersCopy = usersCopy.filter(function( obj ) {
          return obj.id !== userID;
        });
        console.log("usersCopy after filter",usersCopy)
        this.setState({
          selectedUsers:usersCopy
        })

      }

    render() {
        return (
            <>
            <p>People Picker</p>
            <PeoplePicker 
              selectionMode="multiple" 
              showMax="3"
              selectionChanged={this.handlePeopleChange}
              //disabled="true"
              // groupId="75ed7dae-71b6-4360-a303-22587de92f56"
              selectedPeople={this.state.selectedUsers}
              >
                

              </PeoplePicker>
              <UserList 
              users={this.state.selectedUsers}
              handleUserDeletion={(userID)=>this.deleteUserFromPeoplePicker(userID)}
              ></UserList>
          </>
        )
    }
}

