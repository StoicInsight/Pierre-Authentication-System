import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("Token");
  const user = sessionStorage.getItem("User");

  const logout = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <div className="private">
      {token ? (
        <div className="form">
          <h1>You're logged in the private page!</h1>
          <p>Email: {user}</p>
          <p>Token: {token}</p>
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
      )}
    </div>
  );
};
