import React, { Component } from "react";
import fire from "./../firebase/fire";
import "./../sass/main.scss";
import LogOut from "./logout";

class ViewNotes extends Component {
  view;
  orgVal;
  noteKey;

  state = {
    notes: [],
    displayModel: false,
  };

  db = fire.database();
  componentDidMount() {
    this.view = setInterval(this.renderData, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.view);
  }
  renderData = () => {
    if (localStorage.getItem("user")) {
      this.db
        .ref(localStorage.getItem("user"))
        .once("value")
        .then((snap) => {
          const dataObj = snap.val();
          if (dataObj) {
            const arrData = Object.entries(dataObj); // setState to this and loop around state
            this.setState({
              notes: arrData,
            });
          } else {
            this.setState({
              notes: [],
            });
          }
        });
    }
  };
  removeNote = (noteKey) => {
    const noteId = localStorage.getItem("user") + "/" + noteKey;
    fire.database().ref(noteId).remove();
  };
  editNote = (id) => {
    const oldVal = document.getElementById(id).innerHTML;
    console.log(oldVal);
    this.orgVal = oldVal;
    this.noteKey = id;
    this.setState({
      displayModel: !this.state.displayModel,
    });
  };
  subEdit = (e) => {
    e.preventDefault();
    const inputVal = e.target.elements.editInput.value;
    const noteRef = localStorage.getItem("user") + "/" + this.noteKey;
    if (inputVal === "") {
      fire.database().ref(noteRef).remove();
    } else {
      this.db.ref(noteRef).update({
        note: inputVal,
      });
    }
    this.setState({
      displayModel: !this.state.displayModel,
    });
    e.target.elements.editInput.value = "";
  };

  render() {
    return (
      <div>
        <div className="header__con">
          <div className="header">
            {this.state.notes.length === 0 ? (
              <h1 className="header__txt">
                You have no notes
              </h1>
            ) : (
              <h1 className="header__txt">Your notes</h1>
            )}
            <LogOut />
          </div>
        </div>

        {this.state.notes.length !== 0 &&
          this.state.notes.map((note) => (
            <div className="view__notes" key={note[0]}>
              <div
                id={note[0]}
                onDoubleClick={() => this.editNote(note[0])}
                key={note[0]}
                defaultValue={note[0]}
              >
                {note[1].note}{" "}
              </div>
              <div className="view__btns">
                <button
                  className="view__btn"
                  onClick={() => this.editNote(note[0])}
                >
                  Edit
                </button>
                <button
                  className="view__btn"
                  value={note[0]}
                  onClick={(e) => {
                    this.removeNote(note[0]);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        {this.state.displayModel && (
          <div className="modle">
            <form className="modle__form" onSubmit={this.subEdit}>
              <input
                className="modle__input"
                id="editInput"
                name="editInput"
                defaultValue={this.orgVal}
                type="text"
              />
              <button className="modle__btn">Submit Change</button>
            </form>
            <button
              onClick={() => {
                this.setState({ displayModel: !this.state.displayModel });
              }}
              className="modle__btn-cancel"
            >
              X
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default ViewNotes;
