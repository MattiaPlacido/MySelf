import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const initialFormData = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

export default function RegistrationPage() {
  const [formData, setFormData] = useState(initialFormData);
  const { register } = useUserContext();

  async function handleSubmit() {
    const { name, surname, email, password } = formData;
    //controls are already in the registration function
    register(name, surname, email, password);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="border border-dark w-25 mx-auto rounded-5 py-4 px-3 bg-black text-white mt-5">
        <p className="text-white text-center fs-2 pb-3 fw-bold">Sign up</p>
        <div className="d-flex justify-content-around gap-3">
          <div className="mb-4 w-75">
            <label htmlFor="registration-form-name" className="form-label mx-2">
              <b> Name</b>
            </label>
            <input
              type="text"
              className="form-control rounded-4 bg-dark border-dark text-white"
              name="name"
              id="registration-form-name"
              onChange={handleFormChange}
              value={formData.name}
              required
            />
          </div>
          <div className="w-75">
            <label
              htmlFor="registration-form-surname"
              className="form-label mx-2"
            >
              <b>Surname</b>
            </label>
            <input
              type="text"
              className="form-control rounded-4 rounded-4 bg-dark border-dark text-white"
              name="surname"
              id="registration-form-surname"
              onChange={handleFormChange}
              value={formData.surname}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="registration-form-email" className="form-label mx-2">
            <b>Email address</b>
          </label>
          <input
            type="email"
            className="form-control rounded-4 rounded-4 bg-dark border-dark text-white"
            id="registration-form-email"
            name="email"
            onChange={handleFormChange}
            value={formData.email}
            required
          />
        </div>
        <div className=" mb-5">
          <label
            htmlFor="registration-form-password"
            className="form-label mx-2"
          >
            <b>Password</b>
          </label>
          <input
            type="password"
            className="form-control rounded-4 rounded-4 bg-dark border-dark text-white"
            id="registration-form-password"
            name="password"
            onChange={handleFormChange}
            value={formData.password}
            required
          />
          <NavLink
            to="/login"
            className="nav-link text-decoration-none text-secondary fw-bold text-center pt-2"
          >
            Already a member? <span className="text-white">Sign in</span>
          </NavLink>
        </div>
        <div className="d-flex justify-content-center pt-2">
          <button
            type="submit"
            className="btn btn-warning text-white p-2 w-100 rounded-pill"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <b className="fs-5">Create Account</b>
          </button>
        </div>
      </div>
    </>
  );
}
