import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";

function TodoList() {
  const [task, setTask] = useState("");
  const [listItem, setListItem] = useState([]);

  const db = getDatabase();
  const handleInputValue = (e) => {
    setTask(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  // console.log(task);

  // add data in firebase
  const handleTodoBtn = () => {
    if (!task) {
      alert("Enter Your Task!");
      return;
    }

    console.log(`add item ${task}`);
    setTask("");

    set(push(ref(db, "todoList/")), {
      listName: task,
    });
  };

  // read data fireBase

  useEffect(() => {
    const starCountRef = ref(db, "todoList/");

    onValue(starCountRef, (snapshot) => {
      const arrey = [];

      snapshot.forEach((item) => {
        arrey.push({ ...item.val(), id: item.key });
      });

      setListItem(arrey);
    });
  }, []);

  // remove list function

  const handleRemoveBtn = (id) => {
    remove(ref(db, "todoList/" + id));
  };

  // clear all btn function

  const handleClearAllBtn = () => {
    remove(ref(db, "todoList/"));
  };

  return (
    <section className=" w-full h-full p-2 ">
      <div className="p-4  max-w-80  mx-auto bg-white rounded-xl">
        <h2 className="text-center font-bold font-serif mb-5 text-2xl">
          My ToDo-List
        </h2>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="bg-white w-full rounded-2xl px-3 py-1 mb-4  outline-none shadow-input "
            placeholder="Enter Your Task"
            onChange={handleInputValue}
            value={task}
          />

          <button
            onClick={handleTodoBtn}
            className="bg-green-500 w-full text-lg font-serif text-white font-semibold capitalize rounded-2xl cursor-pointer hover:bg-yellow-500 duration-300 "
          >
            add task
          </button>
        </form>

        <div className="mt-4">
          <ul>
            {listItem.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center justify-between text-[16px] font-semibold capitalize  px-3 py-1 rounded-2xl shadow-input mb-3 "
              >
                <span>
                  {index + 1}. {item.listName}{" "}
                </span>

                <MdDeleteForever
                  onClick={() => handleRemoveBtn(item.id)}
                  className=" rounded-2xl text-lg hover:text-white hover:bg-red-500 duration-300 cursor-pointer"
                />
              </li>
            ))}
          </ul>

          {listItem.length > 1 && (
            <div className="flex items-center justify-center">
              <button
                onClick={handleClearAllBtn}
                className=" bg-green-500 py-1 px-4 text-white font-semibold font-serif rounded-2xl hover:bg-red-500 duration-500 cursor-pointer mx-auto "
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TodoList;
