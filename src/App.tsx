import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import TaskPage from "./pages/task/TaskPage";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <div className="from-gray-100 to-gray-300 bg-linear-to-br">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
