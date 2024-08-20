import Headers from "./Headers";
import Category from "./Category";
import dashboardData from "../dashboardData.json";
import { useContext } from "react";
import WidgetContext from "../context/WidgetContext";
const Content = () => {
  const { fetchedData } = useContext(WidgetContext);
  return (
    <div className="bg-blue-50 py-5 px-10">
      <Headers />
      {fetchedData.categories.map((category) => (
        <Category key={category.id} title={category.title} id={category.id} />
      ))}
    </div>
  );
};

export default Content;
