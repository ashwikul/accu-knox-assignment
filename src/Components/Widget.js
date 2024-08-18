import dashboardData from "../dashboardData.json";
import DoughnutChart from "./DoughnutChart";
import StackedChart from "./StackedChart";
import { VscGraph } from "react-icons/vsc";


const Widget = ({ widgetId, categoryId }) => {

  const widgetDetails = dashboardData.categories.find((category) => category.id === categoryId)?.widgets.find((widget) => widget.id === widgetId);

  const transformData = (widget) => {
    return widget.data.map((item, index) => ({
      label: item.status, // Status as the label
      value: parseInt(item.count, 10), // Parse count as integer for the value
      color: widget.backgroundColor[index], // Match the color to the corresponding data
    }));
  };

  const renderWidget = (type) => {
    let segments;
    if (type === "stackedChart") {
      segments = transformData(widgetDetails); // Transform the data for the chart
    }

    switch (type) {
      case 'doughnut':
        return <DoughnutChart widgetDetails={widgetDetails} />;

      case 'stackedChart':
        // return <StackedChart widgetDetails={widgetDetails} />;

        return <StackedChart segments={segments} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-3 rounded-2xl h-60">
      <h3 className=" font-bold text-sm">{widgetDetails?.title}</h3>
      {widgetDetails.data.length > 0 ? renderWidget(widgetDetails.type) : <div className="flex flex-col justify-center items-center h-full">
        <VscGraph size={70} color="rgba(180, 184, 186, 0.3)" />
        <p className="text-sm text-slate-600">No Graph data available!</p>
      </div>}
    </div>
  )

}
export default Widget