import Breadcrumb from "./Breadcrumb";
import SearchBar from "./SearchBar";
import { RiAccountCircleFill } from "react-icons/ri";

const Headers = () => {
  return (
    <nav className="flex justify-between">
      <Breadcrumb />
      <SearchBar />
      <RiAccountCircleFill size={25} color="gray" />
    </nav>
  )
}

export default Headers;