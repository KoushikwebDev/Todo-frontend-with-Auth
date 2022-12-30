import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingSpinner from "../MyComponents/LoadingSpinner";
import account from "./appwrite.config";

const { REACT_APP_BACKEND_URL } = process.env;
let email;
function Alltodos() {
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("effect runnning");
    fetchData();
    //eslint-disable-next-line
  }, []);
  const [todos, setTodos] = useState([]);

  const [userData, setUserData] = useState("");
  //   const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  // console.log(todos);
  async function fetchData() {
    try {
      const data = await account.get();
      setUserData(data);
      email = data.email;
      showTodo();

      console.log(userData);
    } catch (error) {
      console.log(error.message);
      navigate("/appwritelogin");
    }
  }

  //   sending request to backend 😎
  const showTodo = async () => {
    // if (!email) {
    //   alert("Access Denied, Please Login or Create an Account.");
    //   navigate("/");
    // }
    // console.log( REACT_APP_BACKEND_URL);
    console.log(email);
    let { data } = await axios.get(`${REACT_APP_BACKEND_URL}/gettodo/${email}`);
    console.log(data);
    setTodos(data.todo.todos);
    setLoading(false);
  };

  //   edit todo
  const editTodo = async (index) => {
    let todoTitle = prompt("Enter Your new Title");
    let todoTasks = prompt("Enter Your new Tasks");
    if (!(todoTitle && todoTasks)) {
      alert("Title and Tasks Both required.");
      return;
    }
    let data = {
      title: todoTitle,
      tasks: todoTasks,
    };

    await axios.put(
      `${REACT_APP_BACKEND_URL}/edittodo/${email}/${index}`,
      data
    );
    // console.log(response);
    showTodo();
  };

  //   edit task
  const addTask = async (index) => {
    let todoTasks = prompt("Enter New Tasks.");
    if (!todoTasks) {
      alert("Task required.");
      return;
    }

    let data = {
      tasks: todoTasks,
    };

    await axios.put(
      `${REACT_APP_BACKEND_URL}/addtasks/${email}/${index}`,
      data
    );
    showTodo();
  };

  //   edit title
  const editTitle = async (index) => {
    let todoTitle = prompt("Enter New Title.");
    if (!todoTitle) {
      alert("Title required.");
      return;
    }
    let data = {
      title: todoTitle,
    };
    await axios.put(
      `${REACT_APP_BACKEND_URL}/editTitle/${email}/${index}`,
      data
    );
    showTodo();
  };

  //   delete todo
  const deleteTodo = async (uuid) => {
    let confirmValue = prompt('Type "delete" to delete this todo.');
    if (confirmValue === "delete") {
      await axios.delete(
        `${REACT_APP_BACKEND_URL}/deletetodo/${email}/${uuid}`
      );
      showTodo();
      alert("Todo Deleted.");
    }

    if (confirmValue !== "delete") {
      alert("Operation Abolished.");
    }
  };

  return (
    <>
      <Navbar />

      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <div>
          {todos.length ? (
            <div>
              {todos.map((item, index) => {
                return (
                  <div key={uuidv4()}>
                    <div className=" pt-4 pb-1 flex justify-center pl-8 pr-8 flex-col place-items-center gap-3   sm:pl-12 sm:pr-12 md:pl-16 md:pr-16  lg:pl-24 lg:pr-24 ">
                      <div className="left">
                        <h1 className="text-2xl font-bold ">{item.title}</h1>
                      </div>
                      <div className="middle flex gap-4 md:gap-6 ">
                        <button
                          onClick={() => {
                            editTodo(index);
                          }}
                          className="bg-[#35BDD0] rounded-md text-[12px] p-1 sm:w-[80px] lg:text-sm lg:w-[100px] md:pt-2 md:pb-2 md:text-[17px] md:w-[110px] "
                        >
                          Edit Todo
                        </button>

                        {/* <button className="bg-[#35BDD0] rounded-md text-[12px] p-1 sm:w-[80px] lg:text-sm lg:w-[100px] md:pt-2 md:pb-2 md:text-[17px] md:w-[110px] ">
                  Edit Task
                </button> */}
                        <button
                          onClick={() => {
                            addTask(index);
                          }}
                          className="bg-[#35BDD0] rounded-md text-[12px] p-1 sm:w-[80px] lg:text-sm lg:w-[100px] md:pt-2 md:pb-2 md:text-[17px] md:w-[110px] "
                        >
                          Add Task
                        </button>
                        <button
                          onClick={() => {
                            editTitle(index);
                          }}
                          className="bg-[#35BDD0] rounded-md text-[12px] p-1 sm:w-[80px] lg:text-sm lg:w-[100px] md:pt-2 md:pb-2 md:text-[17px] md:w-[110px] "
                        >
                          Edit Title
                        </button>
                        <button
                          onClick={() => {
                            deleteTodo(item.uuid);
                            console.log(item.uuid);
                          }}
                          className="bg-[#FF6263]  rounded-md text-[12px] p-1 sm:w-[80px] lg:text-sm lg:w-[100px] md:pt-2 md:pb-2 md:text-[17px] md:w-[110px] "
                        >
                          Delete Todo
                        </button>
                      </div>
                      <div className="right text-lg">
                        {item.tasks.map((task, index) => (
                          <div key={uuidv4()} className="flex flex-col gap-8">
                            <h3 className="font-semibold md:tracking-wider">
                              Task {index + 1}: {task}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <h1 className="text-lg mx-auto text-center pt-8 font-semibold">
                No Data Found in Database.
              </h1>
              <h1 className="text-lg mx-auto text-center pt-8 font-semibold">
                Add Your Todos.
              </h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Alltodos;
