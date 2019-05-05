import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeAuthState } from '../actions/authState';
import { Authenticator } from 'aws-amplify-react';
// import awsmobile from "../aws-exports";

const mapDispatchToProps = (dispatch) => ({
  changeAuthState: (newAuthState) => dispatch(changeAuthState(newAuthState))
})

class AuthSignup extends Component {

  render() {
    const { user, changeAuthState } = this.props
    return (
      <React.Fragment>
        { !user && <Authenticator amplifyConfig={awsmobile} 
        authState="signIn"
        onStateChange={(authState) => changeAuthState(authState)} 
     />}

        { user && <h3>You are signed in as {user.username}</h3>}
      </React.Fragment>
    )
  }
}

export default connect(null, mapDispatchToProps)(AuthSignup);