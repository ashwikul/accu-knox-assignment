import WidgetContext from "../context/WidgetContext";
import { useContext } from "react";
const EmptyWidget = ({ categoryId }) => {
  const { setIsDrawerActive, setActiveTab } = useContext(WidgetContext);

  const handleAddWidget = () => {
    setIsDrawerActive(true);
    setActiveTab(categoryId);
  };

  return (
    <div className="bg-white rounded-2xl flex justify-center items-center h-60">
      <button
        className="rounded-md bg-white px-2 py-1 border border-slate-300 text-slate-400"
        onClick={handleAddWidget}
      >
        Add Widget +
      </button>
    </div>
  );
};
export default EmptyWidget;
