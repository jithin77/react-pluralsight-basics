import React,{Component} from 'react'

class UserList extends Component{
  constructor(props){
    super(props)
  }

   style={
    display:'flex'
  }
  btnstyle={
    marginLeft:'5px'
  }

  render(){
    const {users}= this.props;
    //debugger
    const usersMarkup =  users.map((user) =>
    <div style={this.style}>
    <li key={user.id}>{user.displayName}</li>
    <button type="button" 
      style={this.btnstyle} 
      onClick={e => this.props.handleUserDeletion(user.id)}>Delete</button>
    </div>
  );
    return(
      <div>
        <h2>User List</h2>
        <ul >
        {usersMarkup}
        </ul>
          
      </div>

    )
  }
}

export default UserList;