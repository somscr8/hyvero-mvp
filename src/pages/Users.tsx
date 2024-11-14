import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/auth';
import { Navigate } from 'react-router-dom';
import { PlusCircle, Edit } from 'lucide-react';
import { db } from '../lib/db'; // Assuming your Dexie instance is exported here
import { User } from '../lib/db';

function Users() {
  const [user] = useAtom(userAtom);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    email: '',
    password: '',
    role: 'executive',
    name: '',
    createdAt: new Date(),
    status: 'active',
  });

  // Redirect if the user is not an admin
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Fetch users from Dexie on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await db.users.toArray();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  const handleAddUserClick = () => {
    setIsEditing(false);
    setCurrentUser({
      email: '',
      password: '',
      role: 'executive',
      name: '',
      createdAt: new Date(),
      status: 'active',
    });
    setIsModalOpen(true);
  };

  const handleEditUserClick = (userToEdit: User) => {
    setIsEditing(true);
    setCurrentUser(userToEdit);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing user
        await db.users.update(currentUser.id!, { ...currentUser });
      } else {
        // Add new user
        await db.users.add({
          ...currentUser,
          createdAt: new Date(),
        });
      }

      // Close the modal and reset the form
      setIsModalOpen(false);
      setIsEditing(false);
      setCurrentUser({
        email: '',
        password: '',
        role: 'executive',
        name: '',
        createdAt: new Date(),
        status: 'active',
      });

      // Refetch the users to update the list
      const allUsers = await db.users.toArray();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error submitting user:', error);
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">Manage system users</p>
        </div>
        <button
          onClick={handleAddUserClick}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role === 'admin' ? 'Admin' : 'Executive'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditUserClick(user)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding or editing a user */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>

            <div className="relative bg-white rounded-lg max-w-3xl w-full mx-auto shadow-xl">
              <div className="p-4">
                <h3 className="text-lg font-semibold">{isEditing ? 'Edit User' : 'Add New User'}</h3>
                <form onSubmit={handleUserSubmit}>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={currentUser.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={currentUser.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={currentUser.password}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required={!isEditing}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      name="role"
                      value={currentUser.role}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="executive">Executive</option>
                    </select>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
                    >
                      {isEditing ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
