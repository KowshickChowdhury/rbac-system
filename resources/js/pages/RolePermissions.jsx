import React, { useEffect, useState } from 'react'
import RolePermissionsApis from '../apis/RolePermissionApis';
import Loading from '../components/Loading/Loading';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import ProfileApis from '../apis/ProfileApis';

function RolePermissions() {
  const [rolePermissions, setrRolePermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [role, setRole] = useState([]);

  useEffect(() => {
    fetchData();
    getAuthRolePer();
  }, []);
  

  const getAuthRolePer = async () => {
    setLoading(true);
    const res = await ProfileApis.index();
    console.log('res', res);
    if (res.success) {
      setRole(res.data.roles);
    }
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await RolePermissionsApis.index();
    console.log('res', res);
    if (res.success) {
      setrRolePermissions(res.data);
    }
    setLoading(false);
  };

  const handleDeleteUser = async (roleId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this attendance?");

    if (shouldDelete) {
        const res = await RolePermissionsApis.delete(roleId);
        if (res.success) {
            setMessage(res.data.message);
            setTimeout(() => {
                setMessage('');
            }, 5000);
            fetchData();
        }
    } else {
        // User clicked "Cancel" or closed the dialog
        console.log("Delete canceled");
    }
  }
  
  return (
    <div>
    {loading ? 
      <Loading />
      :
      <>
      {role.some(r => r.name === 'Admin') && (
        <>
        <div className="flex justify-between items-center mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Role & Permissions</h1>
            <NavLink to="/add-role-permissions">
              <button className="bg-gray-900 text-gray-100 hover:bg-blue-500 p-2 rounded">
                <span className="">Add Role Permission</span>
              </button>
            </NavLink>
        </div>
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
                        <div className="font-semibold text-left">Role</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Permissions</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                    {/* Row */}
                    {rolePermissions?.map(roleP => (
                      <tr key={roleP.id}>
                        <td className="p-2">
                            <div className="font-semibold">{roleP.name}</div>
                        </td>
                        <td className="p-2">
                            <div className="font-semibold">
                              {roleP.permissions.map(per => (
                                <div key={per.id}>{per.name}</div>
                              ))}
                            </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center flex items-center">
                            <Link to={`/edit-role-permissions/${roleP.id}`}>
                              <FaEdit
                              className='mr-4 cursor-pointer'
                              />
                            </Link>
                            <FaTrashAlt
                                className='cursor-pointer'
                                onClick={() => handleDeleteUser(roleP.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </>
      )}
      </>
    }
    </div>
  )
}

export default RolePermissions