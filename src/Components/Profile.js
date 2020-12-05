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
                  {props.userInfoData.mail}
                </td>
              </tr>
            </tbody>
          </table>
      </div>
  ) 
}