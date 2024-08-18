import Widget from "./Widget";
import WidgetContext from "../context/WidgetContext";
import { useContext } from "react";
import EmptyWidget from "./EmptyWidget";

const Category = ({ title, id }) => {
  const { activeWidgets } = useContext(WidgetContext);

  return <div className="mb-4">
    <h1 className=" font-bold">{title}</h1>
    <div className="grid grid-cols-3 gap-3">
      {activeWidgets[id]?.map((widget) => (
        <Widget key={widget} type={widget} categoryId={id} />
      ))}
      <EmptyWidget />
    </div>

  </div>
}
export default Category;