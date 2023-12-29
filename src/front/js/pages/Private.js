import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("Token");

  console.log("TOKEN FROM CONTEXT", store.token);

  const logout = () => {
    actions.logout();
    console.log("JUST LOGGED OUT!");
    navigate("/");
  };

  return (
    <div className="private">
      {token ? (
        <div className="form">
          <h1>Hello you are logged in here is your token {token}</h1>
          <section className="bg-stars">
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
            <span className="star"></span>
          </section>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <h1>You are not logged in please login</h1>
      )}
    </div>
  );
};
