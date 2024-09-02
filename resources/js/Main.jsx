// Main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Auth from './layout/Auth';
import Users from './pages/Users';
import RolePermissions from './pages/RolePermissions';
import UserForm from './components/Users/UserForm';
import RolePermissionForm from './components/RolePermission/RolePermissionForm';
import Profile from './pages/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">        
      <Route element={<Auth />}>
        <Route index element={<Dashboard />} />
        <Route path='profile' element={<Profile />} />
        <Route path='users' element={<Users />} />
        <Route path='add-user' element={<UserForm />} />
        <Route path='edit-user/:id' element={<UserForm />} />
        <Route path='role-permissions' element={<RolePermissions />} />
        <Route path='add-role-permissions' element={<RolePermissionForm />} />
        <Route path='edit-role-permissions/:id' element={<RolePermissionForm />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);


function Main() {
 
  return(
    <RouterProvider router={router} />
  ) 
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/" element={withAuth(Dashboard)} />
  //       <Route path="/test" element={withAuth(Test)} />
  //       <Route path="/signup" element={<Signup />} />
  //     </Routes>
  //   </Router>
  // );
}

export default Main;

if (document.getElementById('root')) {
  const Index = ReactDOM.createRoot(document.getElementById("root"));

  Index.render(
    <React.StrictMode>
      <Main/>
    </React.StrictMode>
  );
}
