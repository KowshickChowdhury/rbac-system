import React, { useEffect, useState } from 'react'
import RoleApis from '../../apis/RoleApis';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import PermissionApis from '../../apis/PermissionApis';
import RolePermissionsApis from '../../apis/RolePermissionApis';
import Select from 'react-select';

function RolePermissionForm() {
  const {id} = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [input, setInput] = useState({
      role_id: '',
      permission_ids: [],
  });
  console.log('input', input)
  console.log('id', id)
  const [validation, setValidation] = useState({
    role_id: false,
    rolepermission_ids: false,
  });

  useEffect(() => {
    getRoles();
    getPermissions();
    if (id) {
     editRolePermission();
    }
  }, []);
  

  const getRoles = async () => {
    const res = await RoleApis.index();
    console.log('res', res);
    if (res.success) {
      setRoles(res.data);
    }
  };

  const getPermissions = async () => {
    const res = await PermissionApis.index();
    console.log('res', res);
    if (res.success) {
      setPermissions(res.data);
    }
  };

  const editRolePermission = async () => {
    const res = await RolePermissionsApis.edit(id);
    console.log('res', res);
    if (res.success) {
      const Data = res.data;
      setInput({
        role_id: Data.id ? Data.id : '',
        permission_ids: Data.permissions.map(permission => ({ label: permission.name, value: permission.id })),
      });
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValidation((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handlePermissionChange = (selectedOptions) => {
    setInput((prevState) => ({
      ...prevState,
      permission_ids: selectedOptions,
    }));
    setValidation((prevState) => ({
      ...prevState,
      permission_ids: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const updatedValidation = {};

    Object.keys(input).forEach((key) => {
      if (!input[key] || (key === 'permission_ids' && input[key].length === 0)) {
        updatedValidation[key] = true;
        isValid = false;
      } else {
        updatedValidation[key] = false;
      }
    });

    setValidation(updatedValidation);

    if (isValid) {
      setLoading(true);
      let res;
      const submitData = {
        ...input,
        permission_ids: input.permission_ids.map((option) => option.value), 
      };
      if (id) {
        // Update existing role permissions
        res = await RolePermissionsApis.update(submitData, id);
      } else {
        // Create new role permissions
        res = await RolePermissionsApis.store(submitData);
      }
      setLoading(false);
      if (res.success) {
        navigate('/role-permissions');
      } else if (res.errors) {
        const errorMessages = Object.values(res.errors).join('. ');
        console.log('errorMessage', errorMessages);
        setMessage(errorMessages);
        setTimeout(() => {
          setMessage('');
        }, 5000);
      }
    }
  };

  return (
    <div>
      <form>
        <div className="space-y-12">

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">{id ? 'Edit Role Permissions' : 'Add Role Permissions'}</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Admin and Manger can {id ? 'edit role permissions' : 'add role permissions'}.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-900">
                  Role
                </label>
                <div className="mt-2">
                  <select
                    id="role_id"
                    name="role_id"
                    autoComplete="role_id"
                    value={input.role_id} 
                    onChange={handleInput} 
                    className="block w-full rounded-md border-0 py-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-1"
                  >
                    <option value={''}>Select Role</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                  {validation.role_id && <p className="text-red-500 text-sm">Role is required</p>}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-semibold leading-6 text-gray-900">
                  Permissions
                </label>
                <div className="mt-2">
                  <Select
                    value={input.permission_ids}
                    onChange={handlePermissionChange}
                    options={permissions.map((permission) => ({
                      label: permission.name,
                      value: permission.id,
                    }))}
                    placeholder="Select Permissions..."
                    isMulti
                  />
                  {validation.permission_ids && <p className="text-red-500 text-sm">At least one permission is required</p>}
                </div>
              </div>
            </div>
            {message && (
              <div className='mt-5 text-red-700' role='alert'>
                  <span className='block sm:inline'>{message}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <NavLink to="/role-permissions">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
          </NavLink>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? 'Loading...' : 
              <>
                {id ? 'Update' : 'Save'}
              </>
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default RolePermissionForm