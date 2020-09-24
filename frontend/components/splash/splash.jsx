import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../navbar/navbar_container';

class Splash extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.logout();
  }

  logoutButton() {
    if (this.props.currentUser) {
      return (
        <React.Fragment> 
            <button className="splash-button" onClick={this.handleClick}>Temp Logout</button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
        </React.Fragment>
      );
    };
  };

  render() {
    return (
      <React.Fragment>
        <div className="hero">
          <div className="navbar">
            <NavBar />
            {this.logoutButton()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Splash;