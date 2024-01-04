import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const User = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem("Token");
  const user = sessionStorage.getItem("User");

  const logout = () => {
    actions.logout();
    navigate("/");
  };

  const validation = async (token) => {
    try {
      actions.validateUser(token).then(navigate("/private"));
    } catch (error) {
      console.error("validation error", error);
    }
  };

  return (
    <div className="user">
      {token ? (
        <div className="form">
          <h1>You're logged in the User page!</h1>
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => validation(token)}>
              Go to private page
            </button>
          </div>
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
