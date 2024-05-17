import logo from "../../asset/logo.webp";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
const NavLeft = () => {
  return (
    <div className="flex items-center gap-x-2 basis-1/4">
      <Link to="/">
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 lg:w-16 lg:h-16"
            loading="eager"
          />
          <p className="lg:hidden">UniSocial</p>
        </div>
      </Link>
      <SearchBar />
    </div>
  );
};

export default NavLeft;
