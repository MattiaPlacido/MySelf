//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//ROUTING
import { BrowserRouter, Routes, Route } from "react-router-dom";
//CONTEXTS
import { UserContextProvider } from "./contexts/userContext";
import { GeneralContextProvider } from "./contexts/GeneralContext";

//LAYOUTS
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";

//PAGES
import HomePage from "./pages/HomePage";
import FinancePage from "./pages/FinancePage";
import TasksPage from "./pages/tasks/TasksPage";
import DailyPage from "./pages/DailyPage";
import MonthlyPage from "./pages/MonthPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

//Check if token is expired
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
  checkTokenExpiration();
}, []);

function App() {
  return (
    <UserContextProvider>
      <GeneralContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="finance" element={<FinancePage />} />
              <Route path="routine" element={<DailyPage />} />
              {/* <Route path="monthly" element={<MonthlyPage />} /> */}
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegistrationPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GeneralContextProvider>
    </UserContextProvider>
  );
}

export default App;
