import React, { useContext, useEffect, useState } from 'react';
import ProfileApis from '../apis/ProfileApis';

function Dashboard() {

  useEffect(() => {
    fetchData();
  }, []);
  

  const fetchData = async () => {
    const res = await ProfileApis.index();
    console.log('res', res);
    if (res.success) {

    }
  };

  return (
    <div>
      <div className="mb-4 sm:mb-0">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
      </div>
    </div>
  )
}

export default Dashboard