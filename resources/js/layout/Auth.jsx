import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";
import Header from "../components/Header";

const Auth = () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const [sidebarOpen, setSidebarOpen] = useState(false);

  return token ?
  <>
    <div className="flex h-screen overflow-hidden">

    {/* Sidebar */}
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    {/* Content area */}
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      {/*  Site header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="grow">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          {/* Contents */}
          <div className="">
            <Outlet />
          </div>

        </div>
      </main>

    </div>
    </div>
  </>
    : <Navigate to="/login" />;
};

export default Auth;