import React, { useContext, useEffect, useState } from 'react';
import ProfileApis from '../apis/ProfileApis';
import CardsTable from '../components/Dashboard/CardsTable';

function Dashboard() {

  const [role, setRole] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  

  const fetchData = async () => {
    const res = await ProfileApis.index();
    console.log('res', res);
    if (res.success) {
      setRole(res.data.roles);
    }
  };

  return (
    <div>
      <div className="mb-4 sm:mb-0">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
      </div>
      <div>
        <CardsTable role={role} />
      </div>
    </div>
  )
}

export default Dashboard