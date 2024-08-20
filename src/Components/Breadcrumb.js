import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];

  return (
    <ul className="flex">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>&gt; {pathname}</li>
    </ul>
  );
};

export default Breadcrumb;
