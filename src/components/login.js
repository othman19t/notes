import React, { Component } from "react";
import fire from "../firebase/fire";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    error: [],
  };
  // To update the state values
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // to login the user
  login = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        this.setState({
          error: "invalid email or password",
        });
      });
  };
  signup = (e) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        this.setState({
          error: "Please make sure you are typing a valid email address",
        });
      });
  };
  render() {
    return (
      <div className="modle">
        <div className="login__modle">
          <h1 className="login__txt">
            Login and start using your favorite notes app{" "}
          </h1>
          <p> {this.state.error} </p>
          <form className="login__form">
            <input
              className="login__input"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
              placeholder="Please type you Email address"
            />{" "}
            <br></br>
            <input
              className="login__input"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              placeholder="Please type your password"
            />
            <br></br>
            <button className="login__btn" onClick={this.login}>
              LogIn
            </button>
          </form>

          <button className="login__btn" onClick={this.signup}>
            SignUp
          </button>
        </div>
      </div>
    );
  }
}

export default LogIn;
