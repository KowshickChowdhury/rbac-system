import React, { useContext, useEffect, useState } from 'react';

function Dashboard() {
  

  // console.log('example', example)

  useEffect(() => {
    fetchData();
  }, []);
  

  const fetchData = async () => {
    
  };

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard