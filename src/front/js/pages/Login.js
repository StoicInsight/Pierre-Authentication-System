import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const submitForm = (e) => {
    e.preventDefault();
    actions.login(email, password);
    navigate("/private");
  };

  return (
    <div className="login">
      <form className="form" onSubmit={(e) => submitForm(e)}>
        <div className="title-2">
          <span>Login</span>
        </div>
        <div className="input-container">
          <input
            className="input-mail"
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span> </span>
        </div>

        <section className="bg-stars">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </section>

        <div className="input-container">
          <input
            className="input-pwd"
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit">
          <span className="sign-text">Sign in</span>
        </button>

        <p className="signup-link">
          No account?
          <a href="" className="up">
            Sign up!
          </a>
        </p>
      </form>
    </div>
  );
};
