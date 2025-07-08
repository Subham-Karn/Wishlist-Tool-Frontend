import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import api from '../api/consts';
import ErrorToast from '../lib/ErrorToast';
import SuccessToast from '../lib/SuccessToast';

const UserDetailsPopup = ({ isOpen, onClose, results , productUrl}) => {
 const [error, setError] = useState(null);
 const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  console.log(results);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const userData = {
     productUrl: productUrl,
     productdetails: results[0] || "No Product Details Found",
     sourcelink: results[0]?.source_link || 'No Source Link Found',
     sourceimage : results[0]?.thumbnail || 'No Source Image Found',
     username : formData.username,
     useremail: formData.email
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        setError(null);
        setSuccess(null);
        await api.createScraberData(userData);
        setFormData({ username: '', email: '' });
        onClose();
        setSuccess('User added successfully');
    } catch (error) {
        setError(error.message || 'Failed to add user. Please try again.');
        console.error('Error updating user:', error);
    }
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                    User Details
                  </Dialog.Title>
                </div>
                {error && <ErrorToast message={error} show={!!error} onClose={() => setError(null)} />}
                {success && <SuccessToast message={success} show={!!success} onClose={() => setSuccess(null)} />}
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                     className="mt-1 block w-full rounded-md outline-none border-gray-300 shadow-sm focus:border-[#18f2d2] focus:ring-[#18f2d2] sm:text-sm p-2 border"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-[#18f2d2] focus:ring-[#18f2d2] sm:text-sm p-2 border"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="submit"
                      className="w-full  inline-flex justify-center rounded-md border border-transparent bg-[#18f2d2] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#14d9b9] focus:outline-none focus:ring-2 focus:ring-[#18f2d2] focus:ring-offset-2"
                    >
                      Submit
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

export default UserDetailsPopup;
