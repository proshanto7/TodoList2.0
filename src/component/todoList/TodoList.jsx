import React, { useEffect, useState } from "react";
import { MdDeleteForever, MdCancelPresentation } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

function TodoList() {
  const [task, setTask] = useState("");
  const [listItem, setListItem] = useState([]);
  const [updateList, setUpdateList] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

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

    set(push(ref(db, "todoList/")), {
      listName: task,
    });
    setTask("");
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

  // data update

  const handleUptedeBtn = (id) => {
    setEditId(id);
    setEdit(!edit);
  };

  const Update = () => {
    update(ref(db, "todoList/" + editId), {
      listName: updateList,
    }).then(() => {
      setEdit(false);
    });
  };

  // update div cancle btn
  const handleCancelBtn = () => {
    setEdit(false);
  };
  return (
    <section className=" w-full h-full p-2 ">
      <div className="p-4 relative max-w-180  mx-auto bg-white rounded-xl">
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

                <div className="flex gap-4 items-center">
                  <CiEdit
                    onClick={() => handleUptedeBtn(item.id)}
                    className=" rounded-2xl text-lg hover:text-white hover:bg-green-600 duration-300 cursor-pointer"
                  />

                  <MdDeleteForever
                    onClick={() => handleRemoveBtn(item.id)}
                    className=" rounded-2xl text-lg hover:text-white hover:bg-red-500 duration-300 cursor-pointer"
                  />
                </div>
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

        {edit && (
          <div className="bg-gray-400/90 absolute top-0 left-0 w-full h-full  flex items-center p-10">
            <button
              onClick={handleCancelBtn}
              className="text-3xl absolute top-1 right-1 bg-white p-1 rounded-full hover:text-red-600 duration-300 cursor-pointer"
            >
              <MdCancelPresentation />
            </button>

            <input
              onChange={(e) => setUpdateList(e.target.value)}
              type="text"
              placeholder="Update Your List"
              className="bg-white w-full  rounded-s-2xl px-2 py-3   outline-none shadow-input "
            />

            <button
              onClick={Update}
              className="bg-green-500  text-lg font-serif text-white font-semibold capitalize rounded-e-2xl cursor-pointer hover:bg-yellow-500 duration-300 px-4 py-2.5 "
            >
              Upadte
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default TodoList;
