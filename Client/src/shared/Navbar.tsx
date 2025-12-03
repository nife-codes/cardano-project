import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = () => {
  const navMenus = [
    { name: "How it works", link: "#" },
    { name: "About us", link: "/about" },
    { name: "Login", link: "/login" },
  ];

  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-[#FFFFFFFA] shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
        {/* logo */}
        <div className=" size-16">
          <img src={logo} alt="logo" className=" w-full h-full object-center" />
        </div>
        {/* links */}
        <div>
          {navMenus.map((menu) => (
            <Link
              key={menu.name}
              to={menu.link}
              className="mx-4 text-[#364153] hover:text-primary-faint"
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
