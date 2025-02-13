import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const urlBackEnd = import.meta.env.VITE_API_URL;

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userId, setUserId] = useState(null);

  //Token expiration function
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
  //Check for token expiration every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  //FUNCTIONS
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

  function register(name, surname, email, password) {
    //Checking name and surname length
    if (
      name.length < 3 ||
      name.length > 40 ||
      surname.length < 3 ||
      surname.length > 40
    ) {
      alert("Name or surname are too short or too long! (3-40 characters)");
      return;
    }

    //Checking password validity
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=])[A-Za-z0-9!@#$%^&*()_\-+=]{8,32}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password needs to be between 8 and 32 characters, and include at least 1 number and 1 special character (e.g., @, _)."
      );
      return;
    }

    //Checking email validity
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    //Checking email existence
    fetch(`${urlBackEnd}/user/emails`, {
      method: "GET",
    })
      .then((emailResponse) => {
        if (!emailResponse.ok) {
          throw new Error("Failed to retrieve emails. Please try again.");
        }
        return emailResponse.json();
      })
      .then((registeredEmails) => {
        let emailExists = false;
        //Comparing emails
        for (let i = 0; i < registeredEmails.length; i++) {
          if (
            registeredEmails[i].email.trim().toLowerCase() ===
            email.trim().toLowerCase()
          ) {
            emailExists = true;
            break;
          }
        }
        if (emailExists) {
          alert("This email is already registered!");
          return;
        }

        //Email is valid and does not exist in the database
        //POST call to the backend to register the user
        fetch(`${urlBackEnd}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, surname, email, password }),
        })
          .then((registerResponse) => {
            if (!registerResponse.ok) {
              throw new Error("Failed to register. Please try again.");
            }
            //if registration is successfull redirect to login page
            alert("Registration successful! Please log in.");
            window.location.href = "/login";
          })
          .catch((error) => {
            console.error("Error during registration:", error.message);
            alert("An error occurred while registering. Please try again.");
          });
      })
      .catch((error) => {
        console.error("Error during email validation:", error.message);
        alert("An error occurred while checking email availability.");
      });
  }

  function login(email, password) {
    //Checking email existence
    fetch(`${urlBackEnd}/user/emails`, {
      method: "GET",
    })
      .then((emailResponse) => {
        if (!emailResponse.ok) {
          throw new Error("Failed to retrieve emails. Please try again.");
        }
        return emailResponse.json();
      })
      .then((registeredEmails) => {
        let emailExists = false;
        //Comparing emails
        for (let i = 0; i < registeredEmails.length; i++) {
          if (
            registeredEmails[i].email.trim().toLowerCase() ===
            email.trim().toLowerCase()
          ) {
            emailExists = true;
            break;
          }
        }
        if (!emailExists) {
          alert("This email is not registered yet.");
          return;
        }

        if (password.length < 6) {
          alert("Password is empty.");
          return;
        }

        //Email exists and password is not empty

        //POST call to the backend to attempt login
        fetch(`${urlBackEnd}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then((loginResponse) => {
            if (!loginResponse.ok) {
              setLoginData(initialLoginData);
              throw new Error("Login failed. Invalid credentials.");
            }
            return loginResponse.json();
          })
          .then((loginResponseData) => {
            //Storing authentication token in localStorage and setting the user ID
            localStorage.setItem("myToken", loginResponseData.token);
            setUserIdFromToken();
            window.location.href = "/";
          })
          .catch((error) => {
            console.error("Error during login:", error.message);
            alert("Login failed. Please check your credentials and try again.");
          });
      })
      .catch((error) => {
        console.error("Error during email validation:", error.message);
        alert("An error occurred while checking email availability.");
      });
  }

  //Setting id from token every time the page is loaded
  useEffect(() => {
    setUserIdFromToken();
  }, []);

  function logout() {
    setUserId(null);
    localStorage.removeItem("myToken");
  }

  return (
    <UserContext.Provider value={{ userId, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
