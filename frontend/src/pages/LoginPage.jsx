import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const urlBackEnd = import.meta.env.VITE_API_URL;

const initialLoginData = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [loginData, setLoginData] = useState(initialLoginData);
  const { login } = useUserContext();

  function handleFormChange(e) {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    const { email, password } = loginData;

    // CHECKING EMAIL EXISTENCE
    try {
      const emailResponse = await fetch(`${urlBackEnd}/user/emails`, {
        method: "GET",
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to retrieve emails. Please try again.");
      }

      const registeredEmails = await emailResponse.json();

      let emailExists = false;
      for (let i = 0; i < registeredEmails.length; i++) {
        registeredEmails[i].email.trim().toLowerCase() ==
        email.trim().toLowerCase()
          ? (emailExists = true)
          : "";
      }
      if (!emailExists) {
        alert("This email is not registered yet.");
        return;
      }
    } catch (error) {
      console.error("Error during email validation:", error.message);
      alert("An error occurred while checking email availability.");
      return;
    }

    if (password.length < 1) {
      alert("Password is empty.");
      return;
    }
    //EMAIL EXISTS AND PASSWORD IS NOT EMPTY

    //LOGIN ATTEMPT
    try {
      const loginResponse = await fetch(`${urlBackEnd}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        setLoginData(initialLoginData);
        throw new Error("Login failed. Invalid credentials.");
      }

      const loginResponseData = await loginResponse.json();

      localStorage.setItem("myToken", loginResponseData.token);

      login(email);

      window.location.href = "/";
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <div className="border border-dark w-25 mx-auto rounded-5 pt-4 pb-4 px-3 bg-black text-white mt-5">
      <p className="text-white text-center fs-2 pb-3 fw-bold">Sign in</p>
      <div className="mb-4">
        <label htmlFor="login-form-email" className="form-label mx-2">
          <b>Email address</b>
        </label>
        <input
          type="email"
          className="form-control rounded-4 rounded-4 bg-dark border-dark text-white"
          id="login-form-email"
          name="email"
          onChange={handleFormChange}
          value={loginData.email}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="login-form-password" className="form-label mx-2">
          <b>Password</b>
        </label>
        <input
          type="password"
          className="form-control rounded-4 rounded-4 bg-dark border-dark text-white"
          id="login-form-password"
          name="password"
          onChange={handleFormChange}
          value={loginData.password}
        />
        <NavLink
          to="/register"
          className="nav-link text-decoration-none text-secondary fw-bold text-center pt-2"
        >
          Not a member? <span className="text-white">Sign up</span>
        </NavLink>
      </div>
      <div className="d-flex justify-content-center pt-4">
        <button
          type="submit"
          className="btn btn-warning text-white p-2 w-100 rounded-pill"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <b className="fs-5">Sign in</b>
        </button>
      </div>
    </div>
  );
}
