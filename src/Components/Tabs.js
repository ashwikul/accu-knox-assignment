import { useState } from 'react';
import dashboardData from "../dashboardData.json";
import { useContext } from 'react';
import TabContext from '../context/TabContext';
import WidgetContext from '../context/WidgetContext';

const Tabs = () => {

  const { activeTab, setActiveTab, selectedWidgets, setSelectedWidgets } = useContext(TabContext);
  const { activeWidgets, setActiveWidgets } = useContext(WidgetContext);

  console.log("selectedWidgets", selectedWidgets);

  const handleCheckboxChange = (widgetType, categoryId) => {
    console.log("handleCheckboxChange", widgetType, categoryId);
    const isExistingWidget = selectedWidgets[categoryId].includes(widgetType);
    if (isExistingWidget) {
      const newSelectedWidgets = { ...selectedWidgets, [categoryId]: selectedWidgets[categoryId].filter((w) => w !== widgetType) };
      setSelectedWidgets(newSelectedWidgets);
      return;
    }
    const newSelectedWidgets = { ...selectedWidgets, [categoryId]: [...selectedWidgets[categoryId], widgetType] };
    setSelectedWidgets(newSelectedWidgets);
  };

  console.log("selectedWidgets", selectedWidgets);

  return (
    <div>
      <div className="flex border-b w-fit">
        {dashboardData.categories.map((category) => (
          <button key={category.id}
            className={`flex items-center p-2 ${activeTab === category.id ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div>
        {activeTab && <ul className="mt-2">
          {dashboardData.categories.find((category) => category.id === activeTab).widgets.map((widget) => (

            <li key={widget.type} className='px-2 py-1 border border-slate-300 rounded-md mb-2'>
              <input type="checkbox" id={widget.type} name={widget.type} value={widget.type} className='mr-2'
                checked={selectedWidgets[activeTab]?.includes(widget.type) || false}
                onChange={() => handleCheckboxChange(widget.type, activeTab)} />
              {widget.title}</li>
          ))}
        </ul>}
      </div>
    </div>
  );
};

export default Tabs;










