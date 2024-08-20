import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import WidgetContext from "./context/WidgetContext";
import dashboardData from "./dashboardData.json";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
function App() {
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState({});
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [activeTab, setActiveTab] = useState("cspm");
  const [fetchedData, setFetchedData] = useState(dashboardData);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [suggestions, setSuggestions] = useState([]);
  const [searchedWidget, setSearchedWidget] = useState({});

  useEffect(() => {
    let initialWidgets = {
      categories: [],
    };
    fetchedData.categories.forEach((category) => {
      initialWidgets.categories.push({ ...category, widgets: [] });
    });
    setActiveWidgets(initialWidgets);
  }, []);

  return (
    <WidgetContext.Provider
      value={{
        isDrawerActive,
        setIsDrawerActive,
        activeWidgets,
        setActiveWidgets,
        activeTab,
        setActiveTab,
        fetchedData,
        selectedWidgets,
        setSelectedWidgets,
        searchText,
        setSearchText,
        suggestions,
        setSuggestions,
        debouncedSearchText,
        setDebouncedSearchText,
        searchedWidget,
        setSearchedWidget,
      }}
    >
      <RouterProvider router={router} />
    </WidgetContext.Provider>
  );
}

export default App;
