import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

//COULD BE DIVIDED IN LOGIN FORM AND LOGIN PAGE

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
    login(email, password);
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
          required
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
          required
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
