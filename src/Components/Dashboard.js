import React, { useEffect } from 'react';
import NavBar from './NavBar';
import Content from './Content';
import Drawer from './Drawer';
import WidgetContext from '../context/WidgetContext';
import { useContext } from 'react';
const Dashboard = () => {

  const { isDrawerActive } = useContext(WidgetContext);



  return (
    <div className='flex flex-col '>
      <NavBar />
      <Content />
      {isDrawerActive && <Drawer />}
    </div>
  );
}

export default Dashboard;