import dashboardData from "../dashboardData.json";
const Widget = ({ type, categoryId }) => {

  const widgetDetails = dashboardData.categories.find((category) => category.id === categoryId)?.widgets.find((widget) => widget.type === type);
  console.log("widgetDetails", widgetDetails);

  return (
    <div className="bg-white p-3 rounded-2xl h-60">
      <h3 className=" font-bold text-sm">{widgetDetails.title}</h3>
      <p>graph</p>
    </div>
  )

}
export default Widget