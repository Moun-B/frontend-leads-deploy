import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Header = ({ title }) => {
  const [
    token,
    setToken,
    toogleRegister,
    isLoginShown,
    toogleLogin,
    isRegisterShown,
  ] = useContext(UserContext);
  const [navbarBurger, setNavbarBurger] = useState(false);

  const handleLogout = () => {
    setToken(null);
  };

  const handleNavbarBurger = () => {
    setNavbarBurger((current) => !current);
  };

  return (
    <>
      <nav className="navbar has-shadow is-light">
        <div className="navbar-brand">
          <div className="navbar-item">
            <strong>Leads Manager API app</strong>
          </div>
          <a
            role="button"
            className={
              navbarBurger ? "navbar-burger is-active" : "navbar-burger"
            }
            aria-label="menu"
            aria-expanded="false"
            onClick={handleNavbarBurger}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={navbarBurger ? "navbar-menu is-active" : "navbar-menu"}>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {!token ? (
                  <button
                    className="button is-link"
                    onClick={() => toogleRegister()}
                  >
                    Register
                  </button>
                ) : null}
                {!token ? (
                  <button
                    className="button is-info"
                    onClick={() => toogleLogin()}
                  >
                    Log in
                  </button>
                ) : (
                  <button className="button is-info" onClick={handleLogout}>
                    Log out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="has-text-centered m-6">
        <h1 className="title">{title}</h1>
      </div>
    </>
  );
};

export default Header;
