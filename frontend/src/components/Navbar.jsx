import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import styles from "./components.module.css";

export default function NavBar() {
  const { userId, logout } = useGlobalContext();

  return (
    <>
      <div
        className={`py-3 bg-dark text-light d-flex justify-content-around fs-5 ${styles.navbar}`}
      >
        <div className="px-5 fs-1">
          <p>
            <span className="text-warning">My</span>
            <span>Self</span>
          </p>
        </div>
        <div className="container d-flex justify-content-evenly align-items-center">
          <NavLink to="/" className="nav-link text-decoration-none mx-2">
            Home
          </NavLink>
          <NavLink to="/routine" className="nav-link text-decoration-none mx-2">
            Routine
          </NavLink>
          {/* <NavLink to="/monthly" className="nav-link text-decoration-none mx-2">
            Month
          </NavLink> */}
          <NavLink to="/tasks" className="nav-link text-decoration-none mx-2">
            Tasks
          </NavLink>
          <NavLink to="/finance" className="nav-link text-decoration-none mx-2">
            Finances
          </NavLink>
          {/* login button */}
        </div>
        <div className="px-5 align-items-center d-flex">
          {userId ? (
            <a
              className="text-white btn fs-4"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </a>
          ) : (
            <>
              <NavLink
                to="/login"
                className="nav-link text-decoration-none px-4"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="nav-link text-decoration-none px-4"
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}
