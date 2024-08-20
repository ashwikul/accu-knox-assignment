import { FiRefreshCcw } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsFillClockFill } from "react-icons/bs";
import { useContext } from "react";
import WidgetContext from "../context/WidgetContext";

const Headers = () => {
  const { setIsDrawerActive, setActiveTab } = useContext(WidgetContext);

  const handleAddWidget = () => {
    setIsDrawerActive(true);
    setActiveTab("cspm");
  };

  return (
    <div className="flex justify-between items-start">
      <p className="font-bold">CNAPP Dashboard</p>

      <div className="flex space-x-2">
        <button
          className="rounded-md bg-white px-2 py-1 border border-slate-300 text-slate-600"
          onClick={handleAddWidget}
        >
          Add Widget +
        </button>
        <button className="rounded-md bg-white p-2 border border-slate-300 text-slate-600">
          <FiRefreshCcw size={15} />{" "}
        </button>
        <button className="rounded-md bg-white p-2 border border-slate-300 text-slate-600">
          <BsThreeDotsVertical size={15} />
        </button>

        <button className="relative rounded-md bg-white px-2 py-1 border border-blue-600 text-slate-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 my-1">
            <span className="text-gray-500 sm:text-sm">
              <BsFillClockFill color="blue" />
            </span>
            <div className="border-l-2 border-blue-600 h-full ml-1"></div>
          </div>
          <select
            name="timeFrame"
            id="timeFrame"
            className="py-1.5 pl-7 pr-2 text-blue-600 w-fit border-none"
          >
            <option value="last_two_days">Last 2 days</option>
            <option value="last_week">Last week</option>
          </select>
        </button>
      </div>
    </div>
  );
};

export default Headers;
