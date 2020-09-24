import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.authButton = this.authButton.bind(this);
  }

  authButton() {
    if (this.props.currentUser) {
      return (
        <React.Fragment> 
          <Link to={"/channels/@me"}> {/* Will point to servers */}
            <button className="splash-button">Open CommeCiCord</button>
          </Link>
        </React.Fragment>
      );
    } else {
      return (
        <Link to={"/login"}>
          <button className="splash-button">Login</button>
        </Link>
      );
    };
  };

  render() {
    return (
      <React.Fragment>
          <Link to={"/"}>
            <div className="navbar-logo">
              <img className="navbar-logo-image" src={discord_logo_inverted}></img>
              <img className="navbar-logo-text" src="https://fontmeme.com/permalink/200923/bf32472e03e05a52072248b6b7fa7fb1.png"></img>
            </div>
          </Link>
        <ul>
          <li><Link to={"/"}><button>Download</button></Link></li>
          <li><Link to={"/"}><button>Why CommeCiCord?</button></Link></li>
          <li><Link to={"/"}><button>Nitro</button></Link></li>
          <li><Link to={"/"}><button>Safety</button></Link></li>
          <li><Link to={"/"}><button>Support</button></Link></li>
        </ul>
        {this.authButton()}
      </React.Fragment>
    )
  }
}

export default NavBar
