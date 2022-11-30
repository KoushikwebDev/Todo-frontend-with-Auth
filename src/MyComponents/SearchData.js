import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Navbar from "./Navbar";

function SearchData() {
  const email = localStorage.getItem("todoEmail");
  const [inputData, setInputData] = useState("");
  const [todos, setTodos] = useState([]);
  const [filterData, setfilterData] = useState([]);

  const showTodo = async () => {
    let { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/search/${email}`
    );
    // console.log(data.response.todos);
    setTodos(data.response.todos);
  };

  const searchFun = (inputData) => {
    for (let ele of todos) {
      if (ele.title.toLowerCase().indexOf(inputData.toLowerCase()) > -1) {
        setfilterData([ele]);
      }
    }
    // console.log(filterData);
  };

  const SearchData = (e) => {
    // console.log(filterData.length);
    setInputData(e.target.value);
    searchFun(inputData);
  };
  useEffect(() => {
    showTodo();
  }, [filterData]);

  //   methods 😎😎

  //   edit todo
  // const editTodo = async (index) => {
  //   let todoTitle = prompt("Enter Your new Title");
  //   let todoTasks = prompt("Enter Your new Tasks");
  //   if (!(todoTitle && todoTasks)) {
  //     alert("Title and Tasks Both required.");
  //     return;
  //   }
  //   let data = {
  //     title: todoTitle,
  //     tasks: todoTasks,
  //   };

  //   await axios.put(
  //     `${process.env.REACT_APP_BACKEND_URL}/edittodo/${email}/${index}`,
  //     data
  //   );
  //   // console.log(response);
  //   showTodo();
  // };

  // //   edit task
  // const addTask = async (index) => {
  //   let todoTasks = prompt("Enter New Tasks.");
  //   if (!todoTasks) {
  //     alert("Task required.");
  //     return;
  //   }

  //   let data = {
  //     tasks: todoTasks,
  //   };

  //   await axios.put(
  //     `${process.env.REACT_APP_BACKEND_URL}/addtasks/${email}/${index}`,
  //     data
  //   );
  //   showTodo();
  // };

  // //   edit title
  // const editTitle = async (index) => {
  //   let todoTitle = prompt("Enter New Title.");
  //   if (!todoTitle) {
  //     alert("Title required.");
  //     return;
  //   }
  //   let data = {
  //     title: todoTitle,
  //   };
  //   await axios.put(
  //     `${process.env.REACT_APP_BACKEND_URL}/editTitle/${email}/${index}`,
  //     data
  //   );
  //   showTodo();
  // };

  //   delete todo 😎
  const deleteTodo = async (uuid) => {
    let confirmValue = prompt('Type "delete" to delete this todo.');
    if (confirmValue === "delete") {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/deletetodo/${email}/${uuid}`
      );
      alert("Todo Deleted.");
      showTodo();
    }
  };

  return (
    <>
      <Navbar />

      <div class="flex justify-center pt-6">
        <div class="mb-3 xl:w-96">
          <div class="input-group relative flex  items-stretch w-full mb-4">
            <input
              type="search"
              value={inputData}
              onChange={(e) => SearchData(e)}
              class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mr-3"
              placeholder="Search Todos"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <button
              class="btn  px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="button-addon2"
              onClick={() => searchFun(inputData)}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                class="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* {filterData.length ? "Html":"No Todos found"} */}
      <div>
        {filterData.length ? (
          <div>
            {filterData.map((item, index) => {
              return (
                <div key={uuidv4()}>
                  <div className=" pt-4 pb-1 flex justify-center pl-8 pr-8 flex-col place-items-center gap-3   sm:pl-12 sm:pr-12 md:pl-16 md:pr-16  lg:pl-24 lg:pr-24 ">
                    <div className="left">
                      <h1 className="text-2xl font-bold ">{item.title}</h1>
                    </div>
                    <div className="middle flex gap-4 md:gap-6 ">
                      <button
                        // onClick={() => {
                        //   editTodo(index);
                        // }}
                        className="bg-[#35BDD0] rounded-md text-[12px] p-1 sm:w-[80px] lg:text-sm lg:w-[100px] md:pt-2 md:pb-2 md:text-[17px] md:w-[110px] opacity-40 "
                      >
                        Edit Todo
                      </button>

                      {/* <button className="bg-[#35BDD0] rounded-md text-[12px] p-1 sm:w-[80px] lg:text-sm lg:w-[100px] md:pt-2 md:pb-2 md:text-[17px] md:w-[110px] ">
                  Edit Task
                </button> */}
                      <button
                        // onClick={() => {
                        //   addTask(index);
                        // }}
                        className="bg-[#35BDD0] rounded-md text-[12px] p-1 sm:w-[80px] lg:text-sm lg:w-[100px] md:pt-2 md:pb-2 md:text-[17px] md:w-[110px] opacity-40"
                      >
                        Add Task
                      </button>
                      <button
                        // onClick={() => {
                        //     editTitle(index);
                        // }}
                        className="bg-[#35BDD0] rounded-md text-[12px] p-1 sm:w-[80px] lg:text-sm lg:w-[100px] md:pt-2 md:pb-2 md:text-[17px] md:w-[110px] opacity-40"
                      >
                        Edit Title
                      </button>
                      <button
                        onClick={() => deleteTodo(item.uuid)}
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
              Make a Search...
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchData;
