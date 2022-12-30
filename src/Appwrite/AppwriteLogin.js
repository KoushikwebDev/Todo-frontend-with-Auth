import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import account from "./appwrite.config";
import AppwriteSocialLogin from "./AppwriteSocialLogin";

function AppwriteLogin() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  async function createSession() {
    try {
      const data = await account.createEmailSession(
        userDetails.email,
        userDetails.password
      );
      if (!data) {
        alert("Invalid Credential");
      } else {
        navigate("/appwritedashboard");
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
      alert("Invalid Credential");
    }
  }

  const userLogin = (e) => {
    e.preventDefault();
    createSession();
    console.log(userDetails);
  };
  return (
    <div>
      <h1 className="mt-5 mb-3 text-2xl text-center">Appwrite</h1>
      <h3 className=" text-center text-xl font-semibold">Login</h3>
      <form className="container">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            type="password"
            name="password"
            required
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button
          onClick={(e) => userLogin(e)}
          type="submit"
          className="btn btn-success bg-black"
        >
          Login
        </button>

        <div className="mb-3">
          <span>First time here ? </span>
          <Link to="/appwritesignup">
            <button className="btn btn-primary mx-1">Signup</button>
          </Link>
        </div>

        {/* <div>
          <span>Forget password ? </span>
          <Link to="/forget-password">
            <button className="btn btn-danger mx-1">Forget Password</button>
          </Link>
        </div> */}
      </form>
      <AppwriteSocialLogin />
    </div>
  );
}

export default AppwriteLogin;
