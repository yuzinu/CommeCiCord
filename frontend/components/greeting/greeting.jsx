import React from 'react';
import { Link } from 'react-router-dom';

// const Greeting = ({ currentUser, logout }) => {
//   const sessionLinks = () => (
//     <nav>
//       <Link to="/login">Login</Link>
//       &nbsp;or&nbsp;
//       <Link to="/signup">Sign up!</Link>
//     </nav>
//   );

//   const personalGreeting = () => (
//     <hgroup>
//       <h2>Hi, {currentUser.username}!</h2>
//       <button onClick={logout}>Log Out</button>
//     </hgroup>
//   );

//   return currentUser ? personalGreeting() : sessionLinks();
// };

class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.currentUser) {
      return (
        <hgroup>
          <h2>Hi, {this.props.currentUser.username}!</h2>
          <button onClick={this.props.logout.bind(this)}>Log Out</button>
        </hgroup>
      )
    } else {
      return (
        <hgroup></hgroup>
      )
    }
  }
}

export default Greeting;
