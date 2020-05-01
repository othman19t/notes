import React from "react";
import fire from "./../firebase/fire";
const addItem = (e) => {
  e.preventDefault();
  /** this is the format of the data you should insert to firebase */
  if (localStorage.getItem("user") && e.target.elements.note.value !== "") {
    const newNote = e.target.elements.note.value.trim();
    fire.database().ref(localStorage.getItem("user")).push({
      note: newNote,
    });
  }
  e.target.elements.note.value = "";
};
const AddData = () => {
  return (
    <div className="add">
      <form className="add__form" onSubmit={addItem}>
        <input
          className="add__input"
          placeholder="Type a note"
          name="note"
          type="text"
        />
        <button className="add__btn">Add Note</button>
      </form>
    </div>
  );
};

export default AddData;
