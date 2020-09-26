import React from 'react';
import HeroImage from './hero_image';
import NavBar from '../navbar/navbar_container';

class Hero extends React.Component {
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
      <>
        <div className="grid-3Ykf_K heroBackground-3m0TRU">
          <div className="hero navbar">
            <NavBar />
            {this.logoutButton()}
          </div>
          <HeroImage />
        </div>
      </>
    )
  }
}

export default Hero;