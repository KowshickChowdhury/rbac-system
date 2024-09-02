import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import RolePermissionsApis from "../apis/RolePermissionApis";
import ProfileApis from "../apis/ProfileApis";

const Auth = () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profile, setProfile] = useState();
    const [role, setRole] = useState([]);
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
      fetchData();
      getProfile();
    }, []);
  
    const fetchData = async () => {
      const res = await RolePermissionsApis.getRolePermissions();
      console.log('res', res);
      if (res.success) {
        setProfile(res.data);
        setRole(res.data.roles);
        setPermissions(res.data?.roles?.flatMap(role => role?.permissions));
      }
    };

    const getProfile = async () => {
      const res = await ProfileApis.index();
      console.log('res', res);
      if (res.success) {
        setProfile(res.data);
      }
    };


  return token ?
  <>
    <div className="flex h-screen overflow-hidden">

    {/* Sidebar */}
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={role} permissions={permissions} profile={profile}  />

    {/* Content area */}
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      {/*  Site header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} profile={profile} />

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