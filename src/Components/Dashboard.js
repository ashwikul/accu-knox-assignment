import React, { useEffect } from 'react';
import NavBar from './NavBar';
import Content from './Content';
import Drawer from './Drawer';
import WidgetContext from '../context/WidgetContext';
import { useContext } from 'react';
const Dashboard = () => {

  const { isDrawerActive } = useContext(WidgetContext);

  useEffect(() => {
    if (isDrawerActive) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    };
  }, [isDrawerActive]);

  return (
    <div className='flex flex-col '>
      <NavBar />
      <Content />
      {isDrawerActive && <Drawer />}
    </div>
  );
}

export default Dashboard;