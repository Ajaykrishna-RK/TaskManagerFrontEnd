import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menu, X, LogOut } from "lucide-react";

import NavItem from "./NavbarComponents";
import ButtonLayout from "../common/ButtonLayout";
import PopUpWrapper from "../common/PopUpWrapper";
import TextComponent from "../common/TextComponent";
import { clearAuth } from "../../redux/slice/AuthSlice";
import { navbarLinks } from "../../data/Data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(clearAuth());
    setLogoutModalOpen(false);
  };

  const renderLinks = () =>
    navbarLinks.map((item) => (
      <NavItem
        key={item.link}
        name={item.name}
        link={item.link}
        isActive={pathname === item.link}
      />
    ));

  return (
    <nav className="bg-gray-900 text-white shadow-lg px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <Link to="/">
          <h1 className="text-xl font-bold tracking-wide">Task Manager</h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          {renderLinks()}

          {/* Logout Button */}
          <ButtonLayout
            onClick={() => setLogoutModalOpen(true)}
            variant="danger"
            className="p-2"
          >
            <LogOut width={20} height={20} />
          </ButtonLayout>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen((p) => !p)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden transition-all overflow-hidden
          ${open ? "max-h-96 mt-4" : "max-h-0"}
        `}
      >
        <div className="flex flex-col space-y-4 bg-gray-800 rounded-lg p-4">
          {renderLinks()}

          <ButtonLayout
            onClick={() => setLogoutModalOpen(true)}
            variant="danger"
            className="p-2 w-fit mt-4"
          >
            <LogOut width={20} height={20} />
          </ButtonLayout>
        </div>
      </div>

      {/* LOGOUT CONFIRMATION POPUP */}
      <PopUpWrapper
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Confirm Logout"
      >
        <div className=" flex-col justify-center items-center flex">
        <TextComponent text="Are you sure you want to logout?" />

        <div className=" mt-6">
          <ButtonLayout variant="danger" onClick={handleLogout}>
            Logout
          </ButtonLayout>
        </div>
        </div>
      </PopUpWrapper>
    </nav>
  );
}
