import Widget from "./Widget";
import WidgetContext from "../context/WidgetContext";
import { useContext } from "react";
import EmptyWidget from "./EmptyWidget";

const Category = ({ title, id }) => {
  const { activeWidgets } = useContext(WidgetContext);

  console.log("activeWidgets", activeWidgets);

  return (
    <div className="mb-4">
      <h1 className=" font-bold">{title}</h1>
      <div className="grid grid-cols-3 gap-3">
        {activeWidgets.categories
          ?.find((category) => category.id === id)
          ?.widgets?.map((widget) => (
            <Widget key={widget.id} widget={widget} categoryId={id} />
          ))}
        <EmptyWidget categoryId={id} />
      </div>
    </div>
  );
};
export default Category;
