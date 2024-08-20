import dashboardData from "../dashboardData.json";
import DoughnutChart from "./DoughnutChart";
import StackedChart from "./StackedChart";
import { VscGraph } from "react-icons/vsc";
import { useContext } from "react";
import TabContext from "../context/TabContext";
import WidgetContext from "../context/WidgetContext";

const Widget = ({ widget, categoryId }) => {
  const { activeWidgets, setActiveWidgets } = useContext(WidgetContext);

  const transformData = (widget) => {
    return widget.data.map((item, index) => ({
      label: item.status, // Status as the label
      value: parseInt(item.count, 10), // Parse count as integer for the value
      color: widget.backgroundColor[index], // Match the color to the corresponding data
    }));
  };

  const removeWidget = (widget, categoryId) => {
    setActiveWidgets((prevActiveWidgets) => {
      const category = prevActiveWidgets.categories.find(
        (category) => category.id === categoryId
      );
      const index = category.widgets.indexOf(widget);
      if (index > -1) {
        category.widgets.splice(index, 1);
      }
      return { ...prevActiveWidgets };
    });
  };

  const renderWidget = (type) => {
    let segments;
    if (type === "stackedChart") {
      segments = transformData(widget); // Transform the data for the chart
    }

    switch (type) {
      case "doughnut":
        return <DoughnutChart widget={widget} />;

      case "stackedChart":
        return <StackedChart segments={segments} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-3 rounded-2xl h-60">
      <div className="flex justify-between">
        <h3 className=" font-bold text-sm">{widget.title}</h3>
        <button
          className="text-slate-600"
          onClick={() => removeWidget(widget, categoryId)}
        >
          X
        </button>
      </div>
      {widget?.data.length > 0 ? (
        renderWidget(widget.type)
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <VscGraph size={70} color="rgba(180, 184, 186, 0.3)" />
          <p className="text-sm text-slate-600">No Graph data available!</p>
        </div>
      )}
    </div>
  );
};
export default Widget;
