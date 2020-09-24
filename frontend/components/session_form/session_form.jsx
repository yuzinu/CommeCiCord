import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.renderErrors = this.renderErrors.bind(this); // TODO backend error handling
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors.length > 0) {
      this.props.clearErrors();
    }
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
      } else if (field === "password") {
        if (value.length === 0) {
          this.setState({ passwordError: "- This field is required"});
        } else if (value.length < 6) {
          this.setState({ passwordError: "- This password is too short."});
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
        this.state.passwordError.length === 0) {
      this.props.processForm(user);
    }
  }

  demoLogin(e) {
    e.preventDefault();
    const user = {
      email: "junipoo@test.com",
      password: "junipoo"
    };
    this.props.processForm(user);
    this.renderErrors();
  }

  errorTitle(field) {
    const backendField = field[0].toUpperCase() + field.slice(1);
    const backendError = this.props.errors.findIndex(error => error.includes(backendField)) !== -1;
    if (field === "email" && this.state.emailError !== "" || backendError) {
      return "error";
    } else if (field === "password" && this.state.passwordError !== "" || backendError) {
      return "error";
    } else {
      return "";
    }
  }

  errorInput(field) {
    const backendField = field[0].toUpperCase() + field.slice(1);
    const backendError = this.props.errors.findIndex(error => error.includes(backendField)) !== -1;
    if (field === "email" && this.state.emailError !== "" || backendError) {
      return "error-box";
    } else if (field === "password" && this.state.passwordError !== "" || backendError) {
      return "error-box";
    } else {
      return "login-form-input";
    }
  }

  // renderErrors() { // TODO BACKEND ERROR HANDLING
  //   debugger;
  //   this.setState({emailError: this.props.errors[0].emailError,
  //                  passwordError: this.props.errors[0].passwordError
  //                 });
  // }
  renderErrors() {
    if (this.state.passwordError.length === 0) {
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
            <img className= "navbar-logo-text"
              src="https://fontmeme.com/permalink/200923/bf32472e03e05a52072248b6b7fa7fb1.png">
            </img>
          </div>
        </Link>
        <div className="auth-box">
          <div className="login-box">
            <form className="login-form" onSubmit={this.handleSubmit} >
              <h1 className="login-form-welcome">Welcome back!</h1>
              <h3 className="login-form-message">We're so excited to see you again!</h3>
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
                <div className="login-form-field">
                  <label className={`login-form-title ${this.errorTitle("password")}`}>PASSWORD
                    <h1 className="render-error">
                      {this.state.passwordError}
                      <span className="backend-error">{this.renderErrors()}</span>
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
                <h5 className="login-forgot">Forgot your password?</h5>
                <button className="login-button">{this.props.formType}</button>
                <div className="login-need">
                  <h5>Need an account?</h5>
                  <Link to="/signup">
                    <h5 className="login-swap-form">Register</h5>
                  </Link>
                </div>
              </div>
            </form>
            <div className="qr-box">
              <button className="demo-login-button" onClick={this.demoLogin}>DEMO USER LOGIN</button>
              <h1 className="temp-qr-message">May or may not have a QR code implemented in the future! This section is currently a placeholder in order to achieve pixel perfect UI!</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionForm;
