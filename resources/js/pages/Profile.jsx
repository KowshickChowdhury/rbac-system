import React, { useEffect, useState } from 'react'
import ProfileApis from '../apis/ProfileApis';
import Loading from '../components/Loading/Loading';

function Profile() {
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      getProfile();
    }, []);
    
    const getProfile = async () => {
        setLoading(true);
        const res = await ProfileApis.index();
        console.log('res', res);
        if (res.success) {
            setProfile(res.data);
        }
        setLoading(false);
    };
  return (
    <div>
        {loading ? 
            <Loading />
        :
            <div className="bg-white overflow-hidden shadow rounded-lg border">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                        User Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        This is some information about the user.
                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile?.name}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile?.email}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Role
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {profile?.roles.map(role => (role.name))}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        }
    </div>
  )
}

export default Profile