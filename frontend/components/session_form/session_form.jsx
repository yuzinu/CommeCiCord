import React from 'react';
import { Link } from 'react-router-dom';
import Typed from 'typed.js';
// import SessionAni from '../session_ani/session_ani';

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
    this.renderErrors = this.renderErrors.bind(this); // TODO MORE CUSTOM BACKEND ERROR HANDLING
    this.demoLogin = this.demoLogin.bind(this);
  }

  // componentDidMount() {
  //   this.props.clearErrors();
  // }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.renderErrors();
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
                   (value.indexOf("@") === value.indexOf(".") - 1) ||
                   (value.indexOf(" ") !== -1) ||
                   (value.length < 5)) {
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
    const demo_email = {
      strings: ["junipoo@test.com"],
      typeSpeed: 56, 
    };
    const demo_password = {
      strings: ["junipoo"],
      typeSpeed: 56, 
    };

    new Typed(".demo-email", demo_email);

    setTimeout(() => {
      new Typed(".demo-password", demo_password);
    }, 1600);

    setTimeout(() => {
      this.props.processForm({
        email: "junipoo@test.com",
        password: "junipoo",
      });
    }, 2400);

    this.setState(user, () => {
      const timer = setTimeout(() => this.props.processForm(user), 450);
      return () => clearTimeout(timer);
    });
  }

  errorTitle(field) {
    // const backendField = field[0].toUpperCase() + field.slice(1);
    // const backendError = this.props.errors.findIndex(error => error.includes(backendField)) !== -1;
    if (field === "email" && this.state.emailError !== "") {
      return "error";
    } else if (field === "password" && this.state.passwordError !== "") {
      return "error";
    } else {
      return "";
    }
  }

  errorInput(field) {
    // const backendField = field[0].toUpperCase() + field.slice(1);
    // const backendError = this.props.errors.findIndex(error => error.includes(backendField)) !== -1;
    if (field === "email" && this.state.emailError !== "") {
      return "error-box";
    } else if (field === "password" && this.state.passwordError !== "") {
      return "error-box";
    } else {
      return "login-form-input";
    }
  }

  mapErrorsToState() {
    let email = "";
    let password = "";

    this.props.errors.forEach((error) => {
      if (error.includes("Email")) {
        email = "- " + error;
      } else if (error.includes("Password")) {
        password = "- " + error;
      }
    });

    return {
      emailError: email,
      passwordError: password
    };
  }

  renderErrors() {
    this.setState(this.mapErrorsToState());
  }

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
                    <input className={`${this.errorInput("email")} demo-email`}
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
                        {/* <span className="backend-error">{this.renderErrors()}</span>
                          USED TO RENDER ERRORS SEPARATELY BEFORE CREATING MAPERRORSTOSTATE*/}
                      </h1>
                    </label>
                    <input className={`${this.errorInput("password")} demo-password`}
                      type="password"
                      value={this.state.password}
                      onChange={this.update('password')}
                      placeholder={`\u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022`}
                      required
                    />
                  </div>
                  <Link to={"/login"} className="login-forgot">Forgot your password?</Link>
                  <button className="login-button">{this.props.formType}</button>
                  <div className="login-need">
                    <h5>Need an account?</h5>
                    <Link
                      to={"/signup"}
                      className="login-swap-form">Register
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
      </>
    );
  }
}

export default SessionForm;
