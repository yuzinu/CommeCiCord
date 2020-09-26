import React from 'react';
import { Link } from 'react-router-dom';
// import SessionAni from '../session_ani/session_ani';
import SessionFormContainer from '../session_form/session_form_container';
import SignupFormContainer from '../session_form/signup_form_container';

class AuthForm extends React.Component {

  render() {

    return (
      <>
        <div className="auth-page">
          <Link to={"/"}>
            <div className="login-logo">
              <img className="navbar-logo-image" src={discord_logo_inverted}></img>
              <img className= "navbar-logo-text"
                src="https://fontmeme.com/permalink/200923/bf32472e03e05a52072248b6b7fa7fb1.png">
              </img>
            </div>
          </Link>
          <SessionFormContainer />
        </div>
      </>
    )
  }
}

export default AuthForm;