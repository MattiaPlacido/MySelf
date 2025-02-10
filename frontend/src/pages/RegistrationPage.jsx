import { useState } from "react";
import { NavLink } from "react-router-dom";

const urlBackEnd = import.meta.env.API_URL;

const initialFormData = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

export default function RegistrationPage() {
  const [formData, setFormData] = useState(initialFormData);

  async function handleSubmit() {
    const { name, surname, email, password } = formData;

    if (
      name.length < 3 ||
      name.length > 40 ||
      surname.length < 3 ||
      surname.length > 40
    ) {
      alert("Name or surname are too short or too long! (3-40 characters)");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

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
          : console.log(registeredEmails[i], email);
      }
      if (emailExists) {
        alert("This email is already registered!");
        return;
      }
    } catch (error) {
      console.error("Error during email validation:", error.message);
      alert("An error occurred while checking email availability.");
      return;
    }

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=])[A-Za-z0-9!@#$%^&*()_\-+=]{8,32}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password needs to be between 8 and 32 characters, and include at least 1 number and 1 special character (e.g., @, _)."
      );
      return;
    }

    try {
      const registerResponse = await fetch(`${urlBackEnd}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, email, password }),
      });

      const data = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      alert("Registration successful!");
      console.log("Server response:", data);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration");
    }
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
