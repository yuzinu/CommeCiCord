import React from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      emailError: '',
      usernameError: '',
      passwordError: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => {
      let value = e.currentTarget.value;
      if (field === 'email') {
        if ( value.length === 0) {
          this.setState({ emailError: "- This field is required"});
        } else if ((value.split("@").length !== 2) ||
                   (value.indexOf("@") === 0) ||
                   (value.split(".").length !== 2) ||
                   (value.indexOf(".") === value.length - 1) ||
                   (value.indexOf("@") > value.indexOf(".")) ||
                   value.length < 5) {
          this.setState({ emailError: "- Not a well formed email address."});
        } else {
          this.setState({ emailError: ""});
        }
      } else if (field === "username") {
        if (value.length === 0) {
          this.setState({ usernameError: "- This field is required"});
        } else if ((value.length < 2) || (value.length > 32)) {
          this.setState({ usernameError: "- Must be between 2 and 32 in length."});
        } else {
          this.setState({ usernameError: ""});
        }
      } else if (field === "password") {
        if (value.length === 0) {
          this.setState({ passwordError: "- This field is required"});
        } else if (value.length < 6) {
          this.setState({ passwordError: "- Must be 6 or more in length."});
        } else if (((value.match(/^\d+|\d+\b|\d+(?=\w)/g) || []).length === 0) || 
                   ((value.toLowerCase().replace(/[^a-z]/g, "").split("")).size > 0)) {
          this.setState({ passwordError: "- Password is too weak or common to use" });
        } else {
          this.setState({ passwordError: "" });
        }
      }
      return this.setState({ [field]: value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    if (this.state.emailError.length === 0 && 
        this.state.usernameError.length === 0 &&
        this.state.passwordError.length === 0) {
      this.props.processForm(user);
    }
  }

  errorTitle(field) {
    if (field === "email" && this.state.emailError !== "") {
      return "error";
    } else if (field === "username" && this.state.usernameError !== "") {
      return "error";
    } else if (field === "password" && this.state.passwordError !== "") {
      return "error";
    } else {
      return "";
    }
  }

  errorInput(field) {
    if (field === "email" && this.state.emailError !== "") {
      return "error-box";
    } else if (field === "username" && this.state.usernameError !== "") {
      return "error-box";
    } else if (field === "password" && this.state.passwordError !== "") {
      return "error-box";
    } else {
      return "login-form-input";
    }
  }

  renderErrors() {
    if (this.state.passwordError.length === 0) {
      this.errorInput("password"); // TODO THIS DOESN'T WORK BECAUSE IT'S ONLY RETURNING CLASSNAME
      return(
        <ul>
          {this.props.errors.map((error, i) => (
            <li className="error" key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    };
  }

  render() {
    return (
      <div className="auth-page">
        <Link to={"/"}>
          <div className="login-logo">
            <img className="navbar-logo-image" src={discord_logo_inverted}></img>
            <img
              className= "navbar-logo-text"
              src="https://fontmeme.com/permalink/200923/bf32472e03e05a52072248b6b7fa7fb1.png">
            </img>
          </div>
        </Link>
        <div className="signup-box">
          <div className="login-box">
            <form className="login-form" onSubmit={this.handleSubmit} >
              <h1 className="login-form-welcome">Create an account</h1>
              <div>
                <div className="login-form-email">
                  <label className={`login-form-title ${this.errorTitle("email")}`}>EMAIL
                    <h1 className="render-error">
                      {this.state.emailError}
                    </h1>
                  </label>
                  <input className={`${this.errorInput("email")}`}
                    type="text"
                    value={this.state.email}
                    onChange={this.update('email')}
                    placeholder="test@test.com"
                    autoFocus
                    required
                  />
                </div>
                <div className="login-form-email">
                  <label className={`login-form-title ${this.errorTitle("username")}`}>USERNAME
                    <h1 className="render-error">
                      {this.state.usernameError}
                    </h1>
                  </label>
                  <input className={`${this.errorInput("username")}`}
                    type="username"
                    value={this.state.username}
                    onChange={this.update('username')}
                    placeholder={`quest_like_tribe`}
                    required
                  />
                </div>
                <div className="login-form-email">
                  <label className={`login-form-title ${this.errorTitle("password")}`}>PASSWORD
                    <h1 className="render-error">
                      {this.state.passwordError}
                      <h5 className="backend-error">{this.renderErrors()}</h5>
                    </h1>
                  </label>
                  <input className={`${this.errorInput("password")}`}
                    type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    placeholder={`\u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022`}
                    required
                  />
                </div>
                <button className="login-button">{this.props.formType}</button>
                <div className="already-signup">
                  <Link to="/login">
                    <h5 className="signup-swap-form">Already have an account?</h5>
                  </Link>
                  <h5 className="signup-tos">By registering, you agree to CommeCiCord's <Link href={"https://www.discord.com"}>Terms of Service</Link> and <Link to={"/"}>Privacy Policy.</Link></h5>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
