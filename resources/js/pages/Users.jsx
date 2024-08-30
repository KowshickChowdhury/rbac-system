import React, { useEffect, useState } from 'react'
import UserApis from '../apis/UserApis';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  

  const fetchData = async () => {
    const res = await UserApis.index();
    console.log('res', res);
    if (res.success) {
      setUsers(res.data);
    }
  };

  return (
    <div>
        <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Users</h1>
        </div>
        <div className=" bg-white dark:bg-gray-800 shadow-sm rounded-xl">
          <div className="p-3">
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
                          <FaEdit
                          className='mr-4 cursor-pointer'
                          onClick={() => handleEditUser(user)}
                          />
                          <FaTrashAlt
                              className='cursor-pointer'
                              onClick={() => handleDeleteUser(user.id)}
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
    </div>
  )
}

export default Users