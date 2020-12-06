
import { PeoplePicker } from '@microsoft/mgt-react';
import React from 'react'


// const scopes = {
//         scopes: ["User.Read"]      //account:null
// };



export default function PeoplePickerControl (props){

//   let myProvider = new SimpleProvider((scopes) => {
//         console.log("props", props)
//         props.authObj.getTokenPopup(scopes)
//   },props.authObj.signIn,props.authObj.signOut);
// //,props.authObj.myMSALObj.signIn,props.authObj.myMSALObj.signOut
//   Providers.globalProvider = myProvider;

  // console.log(Providers.globalProvider)

  // console.log("myprovider",myProvider
  const handlePeopleChange = (e)=>{
      console.log("selected people",e.target.selectedPeople)
  }
  return(
    <>
      <p>People Picker</p>
      <PeoplePicker selectionChanged={handlePeopleChange}/>
    </>
  )
}