import "./styles.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import Status from "./Status";

export default function App() {
  const [lists, setLists] = useState([]);
  const [input, setInput] = useState("");

  const [filterOption, setFilterOption] = useState("all");
  const [isEdit, setIsEdit] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isEditId, setEditId] = useState("");
  const [addIndex, setAddIndex] = useState(0);

  //input changing
  const changeInputHandler = (event) => {
    setInput(event.target.value);
  };

  //submit button handler
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
            return { ...item, task: input, time: new Date() };
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
      const newTask = {
        id: uuidv4(),
        time: new Date(),
        task: input,
        status: false
      };
      setLists([...lists, newTask]);
      setInput("");
    }
  };

  //delete current task
  const deleteHandler = (id) => {
    setLists(lists.filter((item) => item.id !== id));
  };

  //handel checkbox
  const checkHandler = (event, id, index) => {
    const values = [...lists];
    values[index].status = event.target.checked;
    setLists(values);
  };

  //set dropdown list value
  const filterHandler = (event) => {
    // const newValue = event.target.value;
    setFilterOption(event.target.value);
  };

  //sort by date and title
  const sortHandler = (event) => {
    const newArray = [...lists];
    if (event.target.value === "date") {
      newArray.sort((a, b) => {
        return a.time - b.time;
      });
    } else if (event.target.value === "title") {
      newArray.sort((a, b) => {
        return a.task - b.task;
      });
    }
    setLists(newArray);
  };

  //serach by keyword
  const searchHandler = () => {
    setIsSearch(true);
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
      <div>
        <label>Filter: </label>
        <select value={filterOption} onChange={filterHandler}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="complete">Complete</option>
        </select>
        <label> Sort By: </label>
        <select onChange={sortHandler}>
          <option value="all"></option>
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>
        <p>Total {lists.length} of Tasks</p>
      </div>

      <div>
        <input
          type="text"
          placeholder={isAdd ? "Insert after current task" : "Add your To-Do"}
          value={input}
          onChange={changeInputHandler}
        ></input>
        <button type="submit" onClick={() => submitHandler(input)}>
          {isEdit ? "Edit" : "Submit"}
        </button>
        <button type="button" onClick={searchHandler}>
          Search
        </button>
      </div>

      <div>
        {lists
          .filter((item) => {
            if (filterOption === "active") {
              if (item.status === false) {
                return true;
              }
              return false;
            } else if (filterOption === "complete") {
              if (item.status === true) {
                return true;
              }
              return false;
            } else if (isSearch) {
              return item.task.includes(input);
            } else {
              return true;
            }
          })
          .map((item, index) => {
            const { id, time, task, status } = item;
            return (
              <div key={id}>
                <input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => checkHandler(e, id, index)}
                />
                {task}
                <button onClick={() => editHandler(id)}>Edit</button>
                <button onClick={() => deleteHandler(id)}>Delete</button>
                <button onClick={() => addHandler(index)}> + </button>
                <p>
                  {time.toLocaleTimeString()}, {time.toLocaleDateString()}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
