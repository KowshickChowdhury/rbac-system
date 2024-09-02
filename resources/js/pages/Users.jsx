import React, { useEffect, useState } from 'react'
import UserApis from '../apis/UserApis';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import RolePermissionsApis from '../apis/RolePermissionApis';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [role, setRole] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchData();
    getRolePermissions();
  }, []);
  
  const fetchData = async () => {
    setLoading(true);
    const res = await UserApis.index();
    console.log('res', res);
    if (res.success) {
      setUsers(res.data);
    }
    setLoading(false);
  };

  const getRolePermissions = async () => {
    const res = await RolePermissionsApis.getRolePermissions();
    // console.log('getRolePermissions', res);
    if (res.success) {
      setRole(res.data.roles);
      setPermissions(res.data?.roles?.flatMap(role => role?.permissions));
    }
  };
  console.log('role', role)
  console.log('permissions', permissions)
  
  const handleDeleteUser = async (userId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this attendance?");

    if (shouldDelete) {
        const res = await UserApis.delete(userId);
        if (res.success) {
            setMessage(res.data.message);
            setTimeout(() => {
                setMessage('');
            }, 2000);
            fetchData();
        }
    } else {
        // User clicked "Cancel" or closed the dialog
        console.log("Delete canceled");
    }
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Users</h1>
            {permissions.some(permission => permission.name === 'create-users') && (
            <NavLink to="/add-user">
              <button className="bg-gray-900 text-gray-100 hover:bg-blue-500 p-2 rounded">
                <span className="">Add User</span>
              </button>
            </NavLink>
            )}
        </div>
        {loading ? 
          <Loading />
          :
          <div className=" bg-white dark:bg-gray-800 shadow-sm rounded-xl">
            <div className="p-3">
              {message && (
                <div className='border px-4 py-3 rounded relative bg-green-100 border-green-400 text-green-700' role='alert'>
                    <span className='block sm:inline font-bold'>{message}</span>
                </div>
              )}
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full dark:text-gray-300">
                  {/* Table header */}
                  <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                    <tr>
                      <th className="p-2">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Email</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Role</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                    {/* Row */}
                    {users?.map(user => (
                      <tr key={user.id}>
                        <td className="p-2">
                            <div className="font-semibold">{user.name}</div>
                        </td>
                        <td className="p-2">
                          <div className="font-semibold">{user.email}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-green-500 font-semibold">{user.roles.map(role => role.name)}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-center flex items-center">
                            {permissions.some(permission => permission.name === 'edit-users') && (
                              <Link to={`/edit-user/${user.id}`}>
                                <FaEdit
                                className='mr-4 cursor-pointer'
                                />
                              </Link>
                            )}
                            {permissions.some(permission => permission.name === 'delete-users') && (
                              <FaTrashAlt
                                  className='cursor-pointer'
                                  onClick={() => handleDeleteUser(user.id)}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }
    </div>
  )
}

export default Users