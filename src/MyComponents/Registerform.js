import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

function Registerform() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(firstName && lastName && email && password)) {
      alert("All fields are Required.");
      return;
    }
    let userData = {
      firstName,
      lastName,
      email,
      password,
    };

    const [data, err] = await handlePromise(
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, userData)
    );
    console.log(data, err);
    if (!err) {
      alert("Account Created.");
      localStorage.setItem("todoEmail", email);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      navigate("/");
    }
    if (err) {
      alert("Error Occured, try Different email.");
    }
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl font-semibold text-center">Sign up</h1>
          <form
            onSubmit={handleSubmit}
            method="post"
            enctype="multipart/form-data"
          >
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              title="Please fill proper email."
              pattern="\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b"
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              title="Please enter a strong password including all character."
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline lg:tracking-wider  block mx-auto"
              type="submit"
            >
              Create Account
            </button>
          </form>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the &nbsp;
            <NavLink
              className="no-underline border-b border-grey-dark text-blue-500"
              to="/register"
            >
              Terms of Service &nbsp;
            </NavLink>
            and &nbsp;
            <NavLink
              className="no-underline border-b border-grey-dark text-blue-500"
              to="/register"
            >
              Privacy Policy
            </NavLink>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account ?
          <NavLink
            to="/"
            className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105 ml-3 text-lg"
          >
            LogIn
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Registerform;
