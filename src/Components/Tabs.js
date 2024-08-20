import { useContext } from "react";
import WidgetContext from "../context/WidgetContext";

const Tabs = () => {
  const {
    activeTab,
    setActiveTab,
    fetchedData,
    selectedWidgets,
    setSelectedWidgets,
    searchedWidget,
  } = useContext(WidgetContext);

  const handleCheckboxChange = (widget, activeTab) => {
    // Create a new state with updated checkbox status
    const newSelectedWidgets = {
      categories: selectedWidgets.categories.map((tab) => {
        if (tab.id === activeTab) {
          // Check if the widget is already in the list
          const isWidgetSelected = tab.widgets.some((w) => w.id === widget.id);

          return {
            ...tab,
            widgets: isWidgetSelected
              ? tab.widgets.filter((w) => w.id !== widget.id) // Remove widget if already selected
              : [...tab.widgets, widget], // Add widget if not selected
          };
        }
        return tab;
      }),
    };

    setSelectedWidgets(newSelectedWidgets);
  };

  return (
    <div>
      <div className="flex border-b w-fit">
        {fetchedData.categories.map((category) => (
          <button
            key={category.id}
            className={`flex items-center p-2 ${
              activeTab === category.id ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div>
        {activeTab && (
          <ul className="mt-2">
            {fetchedData.categories
              .find((category) => category.id === activeTab)
              .widgets.map((widget) => (
                <li
                  key={widget.id}
                  className={
                    widget.id === searchedWidget.widgetId
                      ? "px-2 py-1 border border-blue-500 rounded-md mb-2"
                      : "px-2 py-1 border border-slate-300 rounded-md mb-2"
                  }
                >
                  <input
                    type="checkbox"
                    id={widget.id}
                    name={widget.id}
                    value={widget.id}
                    className="mr-2"
                    checked={
                      selectedWidgets.categories
                        ?.find((tab) => tab.id === activeTab)
                        ?.widgets.some((w) => w.id === widget.id) || false
                    }
                    onChange={() => handleCheckboxChange(widget, activeTab)}
                  />
                  {widget.title}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tabs;
