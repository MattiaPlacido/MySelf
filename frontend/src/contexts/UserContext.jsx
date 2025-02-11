import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const urlBackEnd = import.meta.env.API_URL;

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userId, setUserId] = useState(null);

  function checkTokenExpiration() {
    const token = localStorage.getItem("myToken");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("myToken");
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  //USER FUNCTIONS
  async function login(email) {
    try {
      const response = await fetch(`${urlBackEnd}/user/emailToId`, {
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

  function logout() {
    setUserId(null);
    localStorage.removeItem("myToken");
  }

  return (
    <UserContext.Provider value={{ userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
