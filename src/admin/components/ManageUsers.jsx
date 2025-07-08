import React, { useContext, useEffect, useState } from 'react';
import { Users, Edit, Trash2, Plus, Search, ChevronDown, ChevronUp, Shield, X } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import {AdminContext} from '../../context/AdminContext';
import api from '../../api/consts';
// const dummyUsers = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', status: 'Active', joinDate: '2023-05-15' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password123', status: 'Active', joinDate: '2022-11-22' },
//   { id: 3, name: 'Alex Johnson', email: 'alex@example.com', password: 'password123', status: 'Inactive', joinDate: '2023-01-10' },
// ];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {allUser} = useContext(AdminContext)
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    status: 'Active'
  });

  useEffect(() => {
    setUsers(allUser);
  }, [allUser]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ChevronDown className="inline ml-1 h-4 w-4 opacity-0" />;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="inline ml-1 h-4 w-4" /> : 
      <ChevronDown className="inline ml-1 h-4 w-4" />;
  };

  const statusOptions = ['All', 'Active', 'Inactive'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createUser(currentUser);
      setIsAddModalOpen(false);
      resetForm();
      setSuccess('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      setError(error.message || 'Failed to add user. Please try again.');
    }
  };

  const handleEditSubmit = async(e) => {
    e.preventDefault();
    try {
      await api.updateUser(currentUser.id, currentUser);
      setIsEditModalOpen(false);
      resetForm();
      setSuccess('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.message || 'Failed to update user. Please try again.');
    }
  };

  const openEditModal = (user) => {
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      status: user.status
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const resetForm = () => {
    setCurrentUser({
      id: '',
      name: '',
      email: '',
      password: '',
      status: 'Active'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-[#e6faf7] rounded-lg text-[#18f2d2]">
              <Users size={24} />
            </div>
            User Management
          </h1>
          <p className="text-gray-500 mt-1">Manage all registered users</p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#18f2d2] hover:bg-[#14d9b9] text-white px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          <Plus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18f2d2] focus:border-[#18f2d2] outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Shield size={16} className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-[#18f2d2] focus:border-[#18f2d2] outline-none appearance-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#f0fdfa]">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-[#e6faf7] transition-colors"
                  onClick={() => requestSort('id')}
                >
                  <div className="flex items-center gap-1">
                    ID
                    {getSortIcon('id')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-[#e6faf7] transition-colors"
                  onClick={() => requestSort('name')}
                >
                  <div className="flex items-center gap-1">
                    User
                    {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-[#e6faf7] transition-colors"
                  onClick={() => requestSort('email')}
                >
                  <div className="flex items-center gap-1">
                    Email
                    {getSortIcon('email')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-[#e6faf7] transition-colors"
                  onClick={() => requestSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {getSortIcon('status')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-[#e6faf7] transition-colors"
                  onClick={() => requestSort('joinDate')}
                >
                  <div className="flex items-center gap-1">
                    Joined
                    {getSortIcon('joinDate')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#f0fdfa] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#e6faf7] flex items-center justify-center text-[#18f2d2]">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' 
                        ? 'bg-[#e6faf7] text-[#18f2d2]' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-[#18f2d2] hover:text-[#14d9b9] transition-colors p-1 rounded-md hover:bg-[#e6faf7]"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-md hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <UserModal 
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        title="Add New User"
        submitText="Add User"
        currentUser={currentUser}
        onSubmit={handleAddSubmit}
        handleInputChange={handleInputChange}
      />

      {/* Edit User Modal */}
      <UserModal 
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        title="Edit User"
        submitText="Update User"
        onSubmit={handleEditSubmit}
        currentUser={currentUser}
        handleInputChange={handleInputChange}
        isEditMode={true}
      />
    </div>
  );
};

const UserModal = ({ 
  isOpen, 
  setIsOpen, 
  title, 
  submitText, 
  onSubmit, 
  currentUser, 
  handleInputChange,
  isEditMode = false 
}) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={currentUser.name || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#18f2d2] focus:ring-[#18f2d2] sm:text-sm p-2 border"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={currentUser.email || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#18f2d2] focus:ring-[#18f2d2] sm:text-sm p-2 border"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      minLength="6"
                      value={currentUser.password || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#18f2d2] focus:ring-[#18f2d2] sm:text-sm p-2 border"
                    />
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      value={currentUser.status || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#18f2d2] focus:ring-[#18f2d2] sm:text-sm p-2 border"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#18f2d2] focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#18f2d2] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#14d9b9] focus:outline-none focus:ring-2 focus:ring-[#18f2d2] focus:ring-offset-2"
                    >
                      {submitText}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ManageUsers;