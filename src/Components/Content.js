import Headers from "./Headers";
import Category from "./Category";
import dashboardData from "../dashboardData.json";
const Content = () => {
  return (
    <div className="bg-blue-50 py-5 px-10">
      <Headers />
      {dashboardData.categories.map((category) => (
        <Category key={category.id} title={category.title} id={category.id} />
      ))}
    </div>
  )
}

export default Content