import React, { Component } from "react";
import fire from "../firebase/fire";
class LogOut extends Component {
  state = {};
  logout = () => {
    fire.auth().signOut();
  };

  render() {
    return (
      <div className="logout">
        <button className="logout__btn" onClick={this.logout}>log out</button>
      </div>
    );
  }
}

export default LogOut;
