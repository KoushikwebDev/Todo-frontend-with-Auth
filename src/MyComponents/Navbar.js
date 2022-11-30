import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar() {
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  let email = localStorage.getItem("todoEmail");

  const logout = () => {
    localStorage.removeItem("todoEmail");
    navigate("/");
  };

  const getData = async () => {
    let { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/gettodo/${email}`
    );
    setName(data.todo.firstName);
  };
  useEffect(() => {
    getData();
  });
  return (
    <>
      <header className="bg-[#CAD5E2] flex justify-between pl-8 pr-4  pt-6 pb-6  sm:pl-12 sm:gap-8  md:pl-16 md:pr-16">
        <div className="flex place-items-center gap-5 md:gap-16 ">
          <h1 className="text-sm font-bold sm:text-lg md:text-2xl hidden sm:block">
            <NavLink to="/dashboard">Todo-App</NavLink>
          </h1>
          <nav>
            <ul className="flex justify-between gap-3 text-[15px] font-semibold sm:gap-4 sm:text-lg md:gap-8">
              <li className="hover:text-[#FF6666] md:text-xl">
                <NavLink to="/dashboard">Home</NavLink>
              </li>
              <li className=" hover:text-[#FF6666] md:text-xl">
                <NavLink to="/mytodo">MyTodos</NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex place-items-center gap-2 md:gap-6">
          <h2 className="text-[12px] font-semibold md:text-xl sm:text-lg text-blue-600">
            <NavLink to="/search">Search</NavLink>
          </h2>
          <h2 className="text-[12px] font-bold md:text-xl sm:text-lg">
            Hi {Name}
          </h2>
          <button
            onClick={logout}
            className="bg-[#35BDD0] rounded-md text-[12px] p-1 sm:w-[80px] lg:text-sm lg:w-[100px] md:pt-2 md:pb-2 md:text-[17px] md:w-[110px] font-semibold"
          >
            <NavLink to="/">Logout</NavLink>
          </button>
        </div>
      </header>
    </>
  );
}

export default Navbar;
