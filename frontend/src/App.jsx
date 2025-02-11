//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//ROUTING
import { BrowserRouter, Routes, Route } from "react-router-dom";
//CONTEXT
import { GlobalContextProvider } from "./contexts/GlobalContext";

//LAYOUTS:
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
// * PAGES
import HomePage from "./pages/HomePage";
import FinancePage from "./pages/FinancePage";
import TasksPage from "./pages/tasks/TasksPage";
import DailyPage from "./pages/DailyPage";
import MonthlyPage from "./pages/MonthPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <GlobalContextProvider>
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
    </GlobalContextProvider>
  );
}

export default App;
