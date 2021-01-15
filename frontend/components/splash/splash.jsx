import React from 'react';
import { Link } from 'react-router-dom';
import HeroContainer from '../hero/hero_container';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <HeroContainer />
        <div>Thank you for visiting!</div>
      </>
    )
  }
}

export default Splash;