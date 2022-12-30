import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import account from "./appwrite.config";

function Navbar() {
  const navigate = useNavigate();

  const [Name, setName] = useState("User");

  async function fetchData() {
    try {
      const data = await account.get();

      setName(data.name);
    } catch (error) {
      console.log(error.message);
      navigate("/appwritelogin");
    }
  }
  useEffect(() => {
    console.log("effect runnning");

    fetchData();
    //eslint-disable-next-line
  }, []);

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      await account.deleteSession("current");

      navigate("/appwritelogin");
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };
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
                <NavLink to="/appwritedashboard">Home</NavLink>
              </li>
              <li className=" hover:text-[#FF6666] md:text-xl">
                <NavLink to="/appwritetodos">MyTodos</NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex place-items-center gap-2 md:gap-6">
          <h2 className="text-[12px] font-semibold md:text-xl sm:text-lg text-blue-600">
            <NavLink to="/appwritesearch">Search</NavLink>
          </h2>
          <h2 className="text-[12px] font-bold md:text-xl sm:text-lg">
            Hi {Name}
          </h2>
          <button
            onClick={(e) => logoutUser(e)}
            className="bg-[#35BDD0] rounded-md text-[12px] p-2 sm:w-[80px] lg:text-sm lg:w-[100px] md:pt-2 md:pb-2 md:text-[17px] md:w-[110px] font-semibold"
          >
            <NavLink to="/">Logout</NavLink>
          </button>
        </div>
      </header>
    </>
  );
}

export default Navbar;
