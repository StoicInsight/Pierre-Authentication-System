import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUpUser = async () => {
    const req = await fetch(
      "https://probable-disco-55v7qjqv9vxh4vww-3001.app.github.dev/api/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      }
    );

    const res = await req.json();

    console.log("Create user response", res);
  };

  const submitForm = (e) => {
    e.preventDefault();
    signUpUser();
    navigate("/login");
    console.log("Form submited");
  };

  return (
    <div className="signup">
      <form className="form" onSubmit={(e) => submitForm(e)}>
        <div className="title-2">
          <span>Signup</span>
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
          <span className="sign-text">Sign up</span>
        </button>

        <p className="signup-link">
          Already have account?
          <a href="" className="up">
            Login!
          </a>
        </p>
      </form>
    </div>
  );
};
