import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

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
        arrey.push({...item.val(), id:item.key});
      });

      setListItem(arrey);
    });
  }, []);

  // remove list function 

  const handleRemoveBtn = (id) =>{




  }

  console.log(listItem);
  return (
    <section className="bg-gray-400 w-full h-screen ">
      <div className="p-4 max-w-80  mx-auto bg-white">
        <h2 className="text-center font-bold font-serif mb-5 text-2xl">
          My ToDo List
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
            className="bg-green-500 w-full text-lg font-serif text-white font-semibold capitalize rounded-2xl "
          >
            add task
          </button>
        </form>

        <div className="mt-4">
          <ul>
            {listItem.map((item) => (
              <li key={item.id} className="flex items-center justify-between text-[16px] font-semibold capitalize  px-3 py-1 rounded-2xl shadow-input mb-3 ">
                <span>{item.listName}  </span>

                <MdDeleteForever onClick={()=> handleRemoveBtn (item.id)} className=" rounded-2xl text-lg hover:text-white hover:bg-red-500 duration-300 cursor-pointer" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TodoList;
