import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import Register from "./components/Register";
import Header from "./components/Header";
import Login from "./components/Login";
import Table from "./components/Table";

const App = () => {
  const [message, setMessage] = useState("");
  const [
    token,
    setToken,
    toogleRegister,
    isLoginShown,
    toogleLogin,
    isRegisterShown,
  ] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("No response...");
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <>
      <Header title={message} />
      <div className="columns">
        <div className="column"></div>
        <div
          className={`column m-5 ${token ? "is-three-quarters" : "is-half"}`}
        >
          {!token ? (
            <div className="columns">
              {isLoginShown ? <Login /> : <Register />}
            </div>
          ) : (
            <Table />
          )}
        </div>
        <div className="column"></div>
      </div>
    </>
  );
};

export default App;
