import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [userId, setUserId] = useState(null);

  //FUNZIONI
  async function login(email) {
    try {
      const response = await fetch(`http://localhost:3330/user/emailToId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve user information.");
      }

      const data = await response.json();
      console.log(data[0]);

      setUserId(data[0]);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  function setUserIdFromToken() {
    const token = localStorage.getItem("myToken");

    if (!token) {
      console.log("No token found");
      setUserId(0);
    }

    try {
      const decodedToken = jwtDecode(token);

      setUserId(decodedToken.id);
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null;
    }
  }

  useEffect(() => {
    setUserIdFromToken();
  }, []);

  function logout() {
    setUserId(null);
    localStorage.removeItem("myToken");
  }

  return (
    <GlobalContext.Provider value={{ userId, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
