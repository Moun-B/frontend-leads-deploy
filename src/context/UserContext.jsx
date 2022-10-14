import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("LeadsToken"));
  const [isLoginShown, setIsLoginShown] = useState(true);
  const [isRegisterShown, setIsRegisterShown] = useState(false);

  const toogleRegister = () => {
    setIsLoginShown(false);
  };

  const toogleLogin = () => {
    setIsLoginShown(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch("/api/users/me", requestOptions);

      if (!response.ok) {
        setToken(null);
      }
      localStorage.setItem("LeadsToken", token);
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider
      value={[
        token,
        setToken,
        toogleRegister,
        isLoginShown,
        toogleLogin,
        isRegisterShown,
      ]}
    >
      {props.children}
    </UserContext.Provider>
  );
};
