import React from 'react';

const Sidenav = () => {
  return (
    <div className="bg-gray-200 h-screen w-2/12 hidden md:block">
      <ul>
          <li><a href="/" className="block p-4 no-underline font-black">Dashboard</a></li>
      </ul>
  </div>
  );
};

export default Sidenav;
