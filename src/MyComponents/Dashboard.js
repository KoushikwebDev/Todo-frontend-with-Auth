import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

const { REACT_APP_BACKEND_URL } = process.env;
let email = localStorage.getItem("todoEmail");

function Dashboard() {
  const navigate = useNavigate();

  // const [isAuthenticated, setAuthenticate] = useState(true);
  const [title, setTitle] = useState("");
  const [task, seTtask] = useState("");
  //   console.log(title, task);
  const onload = async () => {
    if (!email) {
      alert("Access Denied, Please Login or Create an Account.");
      navigate("/");
      return;
    }

    // let Auth = await axios.get(`${REACT_APP_BACKEND_URL}/dashboard`);
    // // console.log(Auth);
    // if (Auth) {
    //   setAuthenticate(true);
    // }
  };

  useEffect(() => {
    onload();
  });
  // Sending data to DB 😎😎
  const handlePromise = async (promise) => {
    let data, error;
    try {
      data = await promise;
    } catch (err) {
      error = err.message;
    }
    return [data, error];
  };

  const sendData = async () => {
    if (!(title && task)) {
      alert("Enter Title and tasks.");
      return;
    }
    const todo = {
      title,
      tasks: task,
    };

    const [, error] = await handlePromise(
      axios.post(`${REACT_APP_BACKEND_URL}/addtodo/${email}`, todo)
    );
    // console.log(data, error);
    if (!error) {
      alert("Todo Added, Click on MyTodos to See All Todos.");
    }
    if (error) {
      alert("Todo Not Created, Some Error Occured. Try Different Title.");
    }
  };

  const submitHandeler = (e) => {
    e.preventDefault();
    sendData();

    if (title && task) {
      setTitle("");
      seTtask("");
    }
  };

  return (
    <>
      {true ? (
        <div>
          <Navbar />
          <div className=" pt-10 pl-4 pr-4 sm:pl-12 sm:pr-12 md:pl-16 md:pr-16">
            <form
              action=""
              onSubmit={submitHandeler}
              className="flex flex-col  gap-8 pb-6"
            >
              <div className="title">
                <label className="font-semibold">Add Title</label> <br />
                <input
                  className="w-full border-2 p-3 text-lg font-semibold"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="tasks">
                <label className="font-semibold">Add Tasks</label> <br />
                <textarea
                  className="w-full border-2 p-3  text-lg "
                  rows="7"
                  cols="100"
                  type="text"
                  name="tasks"
                  value={task}
                  onChange={(e) => seTtask(e.target.value)}
                />
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline lg:tracking-wider"
                type="submit"
              >
                Add Todo
              </button>
            </form>
            <span>Note: To Add Multiple Tasks, Use Comma(",")</span>
          </div>
        </div>
      ) : (
        "Access Denied."
      )}
    </>
  );
}

export default Dashboard;
