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
  const [activeTab, setActiveTab] = useState('cspm');

  useEffect(() => {
    const initialWidgets = {};
    dashboardData.categories.forEach(category => {
      initialWidgets[category.id] = [];
    })
    setActiveWidgets(initialWidgets);
  }, []);


  console.log("activeWidgets", activeWidgets);


  return (
    <WidgetContext.Provider value={{ isDrawerActive, setIsDrawerActive, activeWidgets, setActiveWidgets, activeTab, setActiveTab }}>
      <RouterProvider router={router} />
    </WidgetContext.Provider>
  );
}

export default App;
