import React, { useEffect, useState } from 'react'
import UserApis from '../../apis/UserApis';
import Loading from '../Loading/Loading';

function CardsTable({ role }) {

    const [regisUsers, setRegisUsers] = useState(0);
    const [roleAdmin, setRoleAdmin] = useState(0);
    const [roleManager, setRoleManager] = useState(0);
    const [roleUser, setRoleUser] = useState(0);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
      }, []);
      
      const fetchData = async () => {
        setLoading(true);
        const res = await UserApis.index();
        console.log('res', res);
        if (res.success) {
            const users = res.data;
            setUsers(users);
            setRegisUsers(users.length);

            let adminCount = 0;
            let managerCount = 0;
            let userCount = 0;

            users.forEach(user => {
                user.roles.forEach(role => {
                    if (role.name === 'Admin') {
                        adminCount++;
                    } else if (role.name === 'Manager') {
                        managerCount++;
                    } else if (role.name === 'User') {
                        userCount++;
                    }
                })
            });

            setRoleAdmin(adminCount);
            setRoleManager(managerCount);
            setRoleUser(userCount);
        }
        setLoading(false);
      };
  return (
    <div>
        {loading ? 
            <Loading/>
        :
        <div>
            <div className='md:flex grid gap-4 items-center'>
                <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl w-44">
                    <div className="p-4">
                        <header className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Registerd Users</h2>
                        </header>
                        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
                        <div className="flex items-start">
                        <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{regisUsers}</div>
                        </div>
                    </div>
                </div>
                {role.some(r => r.name === 'Admin') && (
                    <>
                        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl w-44">
                            <div className="p-4">
                                <header className="flex justify-between items-start mb-2">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Role Admin</h2>
                                </header>
                                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
                                <div className="flex items-start">
                                <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{roleAdmin}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl w-44">
                            <div className="p-4">
                                <header className="flex justify-between items-start mb-2">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Role Manager</h2>
                                </header>
                                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
                                <div className="flex items-start">
                                <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{roleManager}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl w-44">
                            <div className="p-4">
                                <header className="flex justify-between items-start mb-2">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Role User</h2>
                                </header>
                                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
                                <div className="flex items-start">
                                <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{roleUser}</div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className=" bg-white dark:bg-gray-800 shadow-sm rounded-xl my-4">
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
                        </tr>
                        ))}
                        
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
          </div>
        }
    </div>
  )
}

export default CardsTable