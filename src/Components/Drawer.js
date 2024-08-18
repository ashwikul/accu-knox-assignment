import Tabs from "./Tabs";
import WidgetContext from "../context/WidgetContext";
import { useContext, useEffect, useState } from "react";
import TabContext from "../context/TabContext";
import dashboardData from "../dashboardData.json";

const Drawer = () => {
  const [activeTab, setActiveTab] = useState('cspm');
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const { setIsDrawerActive, activeWidgets, setActiveWidgets } = useContext(WidgetContext);



  useEffect(() => {
    setSelectedWidgets(activeWidgets)
  }, [activeWidgets]);

  const handleSubmit = () => {
    setActiveWidgets(selectedWidgets);
    setSelectedWidgets({});
  }



  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, selectedWidgets, setSelectedWidgets }}>
      <div
        className="fixed inset-0 bg-black bg-opacity-50"

      />
      <div className="bg-slate-100 h-screen absolute right-0 top-0 w-2/5 ">
        <header className="flex justify-between items-center py-2 px-4 text-white"
          style={{ backgroundColor: "#060466" }}
        >
          <p>Add Widget</p>
          <button
            onClick={() => setIsDrawerActive(false)}
          >
            X
          </button>
        </header>
        <p className="p-4">Personalise your dashboard by adding the following widget</p>
        <div className="p-4">
          <Tabs />
        </div>

        <footer className="p-4 bg-gray-100 flex justify-end mt-auto fixed bottom-0 right-0">
          <button className="rounded-md bg-white px-4 py-1 border border-slate-300 text-slate-600 text-sm mr-2"
            onClick={() => setIsDrawerActive(false)}
          >
            Cancel
          </button>
          <button className="rounded-md bg-white px-4 py-1 border border-slate-300 text-slate-600 text-sm" onClick={handleSubmit}>
            Confirm
          </button>
        </footer>



      </div>
    </TabContext.Provider>
  );
};

export default Drawer;









