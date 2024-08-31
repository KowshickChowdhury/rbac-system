import React, { useEffect, useState } from 'react'
import RoleApis from '../../apis/RoleApis';
import { NavLink, useNavigate } from 'react-router-dom';
import UserApis from '../../apis/UserApis';

function UserForm() {
  const navigate = useNavigate();
  const[loading, setLoading] = useState(false);
  const[roles, setRoles] = useState([]);
  const[input, setInput] = useState({
      name: '',
      email: '',
      password: '',
      role_id: '',
  });
  // console.log('input', input)
  const [validation, setValidation] = useState({
    name: false,
    email: false,
    password: false,
    role_id: false,
  });

  useEffect(() => {
    getRoles();
  }, []);
  

  const getRoles = async () => {
    const res = await RoleApis.index();
    console.log('res', res);
    if (res.success) {
      setRoles(res.data);
    }
  };

const handleInput = (e) => {
    setInput(prevState => {
        const updatedInput = { ...prevState, [e.target.name]: e.target.value };
        // console.log('input', updatedInput);
        setValidation(prevState => ({
            ...prevState,
            [e.target.name]: false,
        }));
        return updatedInput;
    });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  let isValid = true;
  const updatedValidation = {};
  Object.keys(input).forEach(key => {
      if (!input[key]) {
          updatedValidation[key] = true;
          isValid = false;
      } else {
          updatedValidation[key] = false;
      }
  });
  setValidation(updatedValidation);

  if (isValid) {
      setLoading(true);
      const res = await UserApis.store(input);
      setLoading(false);
      if (res.success) {
          // window.location.reload();
          navigate('/users')
      } else if (res.errors) {
          const errorMessages = Object.values(res.errors).join('. ');
          setMessage(errorMessages);
          setTimeout(() => {
            setMessage('');
          }, 5000);
      }
      console.log('first', res)
  }
}

  return (
    <div>
      <form>
        <div className="space-y-12">

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Add User</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Admin and Manger can add user.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={input.name} 
                    onChange={handleInput}
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                  />
                  {validation.name && <p className="text-red-500 text-sm">Name is required</p>}
                </div>
              </div>

              <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={input.email} 
                    onChange={handleInput}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                  />
                  {validation.email && <p className="text-red-500 text-sm">Email is required</p>}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                  Passoword
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={input.password} 
                    onChange={handleInput} 
                    autoComplete="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1"
                  />
                  {validation.password && <p className="text-red-500 text-sm">Password is required</p>}
                </div>
              </div>

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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-1"
                  >
                    <option value={''}>Select Role</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                  {validation.role_id && <p className="text-red-500 text-sm">Role is required</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <NavLink to="/users">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
          </NavLink>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? 'Loading...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserForm