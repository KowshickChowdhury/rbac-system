// Main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Test from './components/Test';
import Dashboard from './pages/Dashboard';
import withAuth from './layout/Auth';
import Auth from './layout/Auth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">        
      <Route element={<Auth />}>
        <Route index element={<Dashboard />} />
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
