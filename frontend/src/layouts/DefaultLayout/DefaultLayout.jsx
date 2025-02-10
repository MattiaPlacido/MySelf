import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import styles from "./DefaultLayout.module.css";

export default function DefaultLayout() {
  return (
    <>
      <div className={styles.app_container}>
        <NavBar />
        <main className={styles.main_content}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
