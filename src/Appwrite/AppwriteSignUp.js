import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import account from "./appwrite.config";
import AppwriteSocialLogin from "./AppwriteSocialLogin";
import axios from "axios";

const AppwriteSignUp = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  //   for mongoDB
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
    if (!(userDetails.name && userDetails.email && userDetails.password)) {
      alert("All fields are Required.");
      return;
    }
    let userData = {
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
    };

    const [, err] = await handlePromise(
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, userData)
    );
    // console.log(data, err);
    if (!err) {
      alert("Account Created.");
      signUpuser(e);

      setUserDetails({ ...userDetails, name: "" });
      setUserDetails({ ...userDetails, email: "" });
      setUserDetails({ ...userDetails, password: "" });
    }
    if (err) {
      alert("Error Occured, try Different email.");
    }
  };

  //   for app write
  const signUpuser = async (e) => {
    e.preventDefault();
    console.log(userDetails);

    try {
      const User = await account.create(
        uuidv4(),
        userDetails.email,
        userDetails.password,
        userDetails.name
      );
      await account.createEmailSession(userDetails.email, userDetails.password);
      navigate("/appwritedashboard");
      console.log(User);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h1 className="mt-5 mb-3 text-center text-2xl">Appwrite</h1>
      <h3 className=" text-center text-xl font-semibold">Signup</h3>

      <form className="container">
        <div className="mb-3">
          <label for="name" className="form-label">
            Name
          </label>
          <input
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>

        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          type="submit"
          className="btn btn-success bg-black"
        >
          Signup
        </button>

        <div className="mb-3">
          <span>Already have an account ? </span>{" "}
          <Link to="/appwritelogin">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      </form>

      <AppwriteSocialLogin />
    </div>
  );
};

export default AppwriteSignUp;
