import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Loginform() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePromise = async (promise) => {
    let data, err;

    try {
      data = await promise;
    } catch (error) {
      err = error.message;
    }
    return [data, err];
  };

  const submitHandeler = async (e) => {
    e.preventDefault();

    if (!(email && password)) {
      // alert("Enter email and password.");
      return;
    }
    let userData = {
      email,
      password,
    };

    const [, err] = await handlePromise(
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, userData)
    );
    // console.log(data, err);
    if (!err) {
      await localStorage.setItem("todoEmail", email);
      setEmail("");
      setPassword("");

      navigate("/dashboard");
    }
    if (err) {
      alert("Email and Password Incorrect.");
    }
  };

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <h1 className="block text-lg mt-3  text-gray-700 text-center font-semibold">
              Login
            </h1>
            <form
              method="post"
              onSubmit={submitHandeler}
              encType="multipart/form-data"
              className="mt-10"
            >
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg pl-4"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-7">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg pl-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-7 flex">
                <label
                  htmlFor="remember_me"
                  className="inline-flex items-center w-full cursor-pointer"
                >
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="remember"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>

                <div className="w-full text-right">
                  <NavLink
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                    to="/"
                  >
                    Forgot password ?
                  </NavLink>
                </div>
              </div>

              <div className="mt-7">
                <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Login
                </button>
              </div>

              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
                <label className="block font-medium text-sm text-gray-600 w-full">
                  Login Option
                </label>
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>

              <div className="flex mt-7 justify-center w-full">
                <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Facebook
                </button>

                <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Google
                </button>
              </div>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">Don't Have Account ?</label>
                  <NavLink
                    to="/register"
                    className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Sign Up
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginform;
