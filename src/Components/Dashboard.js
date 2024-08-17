import React from 'react';
import NavBar from './NavBar';
import Content from './Content';
const Dashboard = () => {
  return (
    <div className='flex flex-col space-y-1'>
      <NavBar />
      <Content />
    </div>
  );
}

export default Dashboard;