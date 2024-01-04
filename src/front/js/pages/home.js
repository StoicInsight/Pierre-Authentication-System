import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("Token");
  const user = sessionStorage.getItem("User");

  const logout = () => {
    actions.logout();
  };

  return (
    <div className="home">
      <div className="form">
        <h1>You're not logged in please login</h1>
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
        <Link to="/login" className="login">
          Login
        </Link>
      </div>
    </div>
  );
};
