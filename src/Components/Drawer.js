import Tabs from "./Tabs";
import WidgetContext from "../context/WidgetContext";
import { useContext, useEffect, useState } from "react";
import TabContext from "../context/TabContext";

const Drawer = () => {
  const {
    setIsDrawerActive,
    activeWidgets,
    setActiveWidgets,
    selectedWidgets,
    setSelectedWidgets,
    debouncedSearchText,
    setDebouncedSearchText,
    searchText,
    setSearchText,
    suggestions,
    setSuggestions,
    fetchedData,
    setActiveTab,
    setSearchedWidget,
  } = useContext(WidgetContext);

  useEffect(() => {
    setSelectedWidgets(activeWidgets);
  }, [activeWidgets]);

  const handleSubmit = () => {
    setActiveWidgets(selectedWidgets);
    setIsDrawerActive(false);
  };

  // Debounce the search input to delay the effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300); // 300ms debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  // Update suggestions based on the debounced search text
  useEffect(() => {
    if (debouncedSearchText) {
      const suggestedWidgets = [];

      fetchedData.categories.forEach((category) => {
        category.widgets.forEach((widget) => {
          if (
            widget.title
              .toLowerCase()
              .includes(debouncedSearchText.toLowerCase())
          ) {
            suggestedWidgets.push({
              categoryName: category.title,
              categoryId: category.id,
              widgetId: widget.id,
              widgetTitle: widget.title,
            });
          }
        });
      });

      setSuggestions(suggestedWidgets);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchText]);

  const handleSearchedWidget = (suggestion) => {
    console.log("suggestion", suggestion);

    setSearchedWidget(suggestion);
    setSearchText("");
    setDebouncedSearchText("");
    setIsDrawerActive(true);
    setActiveTab(suggestion.categoryId);
  };

  return (
    <TabContext.Provider value={{ selectedWidgets, setSelectedWidgets }}>
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      <div className="bg-slate-100 h-screen absolute right-0 top-0 w-2/5 ">
        <header className="flex justify-between items-center py-2 px-4 text-white bg-blue-950">
          <p>Add Widget</p>
          <button onClick={() => setIsDrawerActive(false)}>X</button>
        </header>
        <p className="p-4">
          Personalise your dashboard by adding the following widget
        </p>
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="m-4 block w-[95%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search widget..."
        />
        {debouncedSearchText && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion) => {
                return (
                  <li
                    key={suggestion.widgetId}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSearchedWidget(suggestion)}
                  >
                    {suggestion.widgetTitle} in {suggestion.categoryName}
                  </li>
                );
              })
            ) : (
              <li className="p-2 cursor-pointer hover:bg-gray-100">
                No widget found
              </li>
            )}
          </ul>
        )}

        <div className="p-4">
          <Tabs />
        </div>

        <footer className="p-4 bg-gray-100 flex justify-end mt-auto fixed bottom-0 right-0">
          <button
            className="rounded-md bg-white px-4 py-1 border border-slate-300 text-slate-600 text-sm mr-2"
            onClick={() => setIsDrawerActive(false)}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-blue-900 px-4 py-1 border border-slate-300 text-white text-sm"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </footer>
      </div>
    </TabContext.Provider>
  );
};

export default Drawer;
