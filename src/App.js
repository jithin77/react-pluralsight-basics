import './App.css';
import React, { Component } from 'react';
import withAuthProvider from './Authentication/AuthProvider';
import Profile from './Components/Profile';
import PeoplePickerControl from './Components/PeoplePickerControl';

const btnSignInStyle = {
  background: 'green',
  color: 'white',
  padding: '15px',
  margin: '10px',
};
const btnSignOutStyle = {
  background: 'red',
  color: 'white',
  padding: '15px',
  margin: '10px',
};

const btnProfileStyle = {
  background: 'yellow',
  color: 'black',
  padding: '15px',
  margin: '10px',
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('App render', this.props);
    const userProfileMarkup =
      this.props.user !== null ? (
        <Profile userInfoData={this.props.user} photo={this.props.userPhoto} />
      ) : null;
    return (
      <div>
        {this.props.isAuthenticated === false ||
        this.props.isAuthenticated === undefined ? (
          <div>
            <button
              type="button"
              style={btnSignInStyle}
              onClick={this.props.login}>
              Sign In
            </button>
          </div>
        ) : (
          <>
            <div>
              <button
                type="button"
                style={btnSignOutStyle}
                onClick={this.props.logout}>
                Sign Out
              </button>
            </div>
            <div>
              <button
                type="button"
                style={btnProfileStyle}
                onClick={this.props.getUserProfile}>
                View Profile
              </button>
            </div>
            {userProfileMarkup}
            <PeoplePickerControl p={this.props} />
          </>
        )}
      </div>
    );
  }
}

export default withAuthProvider(App);
