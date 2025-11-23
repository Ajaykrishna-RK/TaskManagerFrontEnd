import { Link } from "react-router-dom";
export default function NavItem({ name, link, isActive }: { name: string; link: string; isActive: boolean }) {
  return (
    <Link
      to={link}
      className={`
        font-medium transition-colors duration-200 
        ${isActive ? "text-blue-400 font-semibold" : "text-white hover:text-blue-400"}
      `}
    >
      {name}
    </Link>
  );
}