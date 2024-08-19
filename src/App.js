import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import WidgetContext from './context/WidgetContext';
import dashboardData from "./dashboardData.json";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);
function App() {

  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState({});
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [activeTab, setActiveTab] = useState('cspm');
  const [fetchedData, setFetchedData] = useState(dashboardData);

  console.log("initial activeTab", activeTab);


  useEffect(() => {
    let initialWidgets = {
      categories: [],
    };
    fetchedData.categories.forEach(category => {
      initialWidgets.categories.push({ ...category, widgets: [] });
    })
    setActiveWidgets(initialWidgets);
  }, []);



  console.log("activeWidgets", activeWidgets);


  return (
    <WidgetContext.Provider value={{ isDrawerActive, setIsDrawerActive, activeWidgets, setActiveWidgets, activeTab, setActiveTab, fetchedData, selectedWidgets, setSelectedWidgets }}>
      <RouterProvider router={router} />
    </WidgetContext.Provider>
  );
}

export default App;
