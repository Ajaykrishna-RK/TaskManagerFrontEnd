import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";

function App() {
  return (
    <div className="from-gray-100 to-gray-300 bg-gradient-to-br">
      <Routes> 
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/tasks" element={<Tasks />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
