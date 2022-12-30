import React from "react";
import account from "./appwrite.config";

const AppwriteSocialLogin = () => {
  const googleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await account.createOAuth2Session(
        "google"
        // "http://localhost:3000/home",
        // "http://localhost:3000/login",
      );
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const facebookLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createOAuth2Session(
        "facebook",
        "http://localhost:3000/home",
        "http://localhost:3000/login",
        ""
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container my-3 ">
      <b className="block ">Login Options:</b>
      <br />

      <button
        onClick={(e) => googleLogin(e)}
        className="btn btn-outline-danger my-1 mx-2 "
      >
        Google
      </button>

      <button
        onClick={(e) => facebookLogin(e)}
        className="btn btn-outline-primary my-1"
      >
        Facebook
      </button>
    </div>
  );
};

export default AppwriteSocialLogin;
