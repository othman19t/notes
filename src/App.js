import React, { Component } from "react";
import fire from "./firebase/fire";
import Home from "./components/home";
import LogIn from "./components/login";
import "./sass/main.scss";

class App extends Component {
  state = {
    user: {},
  };

  componentDidMount = () => {
    this.authListener();
  };

  // To listen once the user is authenticated store the user id and the opposite
  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  };

  render() {
    return <div className="App">{this.state.user ? <Home /> : <LogIn />}</div>;
  }
}

export default App;
