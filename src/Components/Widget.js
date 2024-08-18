import dashboardData from "../dashboardData.json";
// import { Chart } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { VscGraph } from "react-icons/vsc";


ChartJS.register(ArcElement, Tooltip, Legend);
const Widget = ({ widgetId, categoryId }) => {

  const widgetDetails = dashboardData.categories.find((category) => category.id === categoryId)?.widgets.find((widget) => widget.id === widgetId);
  console.log("widgetDetails", widgetDetails);

  const chartData = {
    labels: widgetDetails?.data?.map((d) => d.status),
    datasets: [{
      label: 'My First Dataset',
      data: widgetDetails?.data?.map((d) => d.count),
      backgroundColor: widgetDetails?.backgroundColor,
      hoverOffset: 4
    }]
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
      },
    },
  };

  return (
    <div className="bg-white p-3 rounded-2xl h-60">
      <h3 className=" font-bold text-sm">{widgetDetails?.title}</h3>
      {widgetDetails.data.length > 0 ? <Doughnut data={chartData} options={options} /> : <div className="flex flex-col justify-center items-center h-full">
        <VscGraph size={70} color="rgba(180, 184, 186, 0.3)" />
        <p className="text-sm text-slate-600">No Graph data available!</p>
      </div>}
    </div>
  )

}
export default Widget