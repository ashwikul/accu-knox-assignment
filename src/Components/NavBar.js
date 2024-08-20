import Breadcrumb from "./Breadcrumb";
import SearchBar from "./SearchBar";
import { RiAccountCircleFill } from "react-icons/ri";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center py-1 px-10">
      <Breadcrumb />
      <SearchBar />
      <RiAccountCircleFill size={25} color="gray" />
    </nav>
  );
};

export default NavBar;
