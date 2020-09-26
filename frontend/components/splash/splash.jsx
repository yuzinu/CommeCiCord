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

      </>
    )
  }
}

export default Splash;