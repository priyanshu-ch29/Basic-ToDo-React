import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

const getLocalStorageData = () => {
  let newData = localStorage.getItem("todo");

  if (newData) {
    return JSON.parse(newData);
  } else {
    return [];
  }
};

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState(getLocalStorageData());

  const handleAddToDoData = () => {
    if (!inputValue) return;

    if (task.includes(inputValue)) {
      setInputValue("");
      return;
    }

    setTask((prevTask) => [...prevTask, inputValue]);
    setInputValue("");
  };

  const handleDeleteToDoData = (value) => {
    const updates = task.filter((items) => items !== value);
    setTask(updates);
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(task));
  }, [task]);

  return (
    <>
      <div className=" flex flex-col gap-5 justify-center items-center m-4">
        <h1 className=" font-bold text-2xl">Todo List</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="enter the task"
            className=" border border-black p-2 rounded-md"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            autoComplete="off"
          />
        </form>
        <button
          className=" p-2 bg-slate-50 rounded-md shadow-md font-semibold"
          onClick={handleAddToDoData}
        >
          Add task
        </button>
        <div>
          <ul>
            {task.map((items, index) => {
              return (
                <li
                  key={index}
                  className=" flex justify-center items-center gap-4 font-semibold text-green-600"
                >
                  {items}
                  <button
                    className=" m-2 text-center text-xl"
                    onClick={() => handleDeleteToDoData(items)}
                  >
                    <MdDelete />
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            className=" m-2 rounded-md shadow-md bg-gray-100 p-2 font-semibold"
            onClick={() => setTask([])}
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
