
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen ">
      <Navbar />

      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
