import React  from 'react'

export default function Profile(props){
  return (
      <div>
          <table>
            <tbody>
              <tr>
                <td>
                    Name:
                </td>
                <td>
                  {props.userInfoData.displayName}
                </td>
              </tr>
              <tr>
                <td>
                    Email:
                </td>
                <td>
                  {props.userInfoData.email}
                </td>
              </tr>
              <tr>
                  <td>
                      <img src={props.photo}></img>
                  </td>
              </tr>
            </tbody>
          </table>
      </div>
  ) 
}