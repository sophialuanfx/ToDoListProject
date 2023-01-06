import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [lists, setLists] = useState([]);
  const [input, setInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isEditId, setEditId] = useState("");
  const [addIndex, setAddIndex] = useState(0);

  const changeHandler = (event) => {
    setInput(event.target.value);
  };
  const submitHandler = (input) => {
    if (!input) {
      //no input in the box
      return;
    } else if (input && isEdit) {
      //edit button
      setIsEdit(false);
      setLists(
        lists.map((item) => {
          if (item.id === isEditId) {
            return { ...item, task: input };
          }
          return item;
        })
      );
      setInput("");
    } else if (input && isAdd) {
      //add if add button is true
      const addArray = [...lists];
      addArray.splice(addIndex + 1, 0, {
        id: new Date().getTime().toString(),
        task: input
      });
      setIsAdd(false);
      setLists(addArray);
      setInput("");
    } else {
      //submit input
      const newTask = { id: new Date().getTime().toString(), task: input };
      setLists([...lists, newTask]);
      setInput("");
    }
  };

  //delete current task
  const deleteHandler = (id) => {
    setLists(lists.filter((item) => item.id !== id));
  };

  //edit current task
  const editHandler = (id) => {
    setIsEdit(true);
    const editItem = lists.find((item) => item.id === id);
    setEditId(id);
    setInput(editItem.task);
  };
  //add after function
  const addHandler = (index) => {
    setIsAdd(true);
    setAddIndex(index);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder={isAdd ? "Insert after current task" : "Add your To-Do"}
        value={input}
        onChange={changeHandler}
      ></input>
      <button type="submit" onClick={() => submitHandler(input)}>
        {isEdit ? "Edit" : "Submit"}
      </button>
      <div>
        {lists.map((item, index) => {
          const { id, task } = item;
          return (
            <article key={id}>
              <input type="checkbox" />
              <label>
                {task}
                <button onClick={() => editHandler(id)}>Edit</button>
                <button onClick={() => deleteHandler(id)}>Delete</button>
                <button onClick={() => addHandler(index)}> + </button>
              </label>
            </article>
          );
        })}
      </div>
    </div>
  );
}
