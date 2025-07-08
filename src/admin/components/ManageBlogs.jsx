import React, { useState, useEffect, useContext } from 'react';
import { Grid, List, FileText, Search, PlusCircle, Edit, Trash2, Calendar, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { deleteBlog, fetchBlogs } from '../../api/apiBlogs';
import ConfirmationModal from './ConfirmationModal';
import ErrorToast from '../../lib/ErrorToast';
import SuccessToast from '../../lib/SuccessToast';
import { AdminContext } from '../../context/AdminContext';

const STATUS_OPTIONS = ['All', 'Published', 'Draft'];
const PER_PAGE = 6;

const ManageBlogs = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sureModal, setSureModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();
  const {setAllBlogs} = useContext(AdminContext);
  useEffect(() => {
    async function fetchData() {
      const res = await fetchBlogs();  
      setBlogs(res);
      setAllBlogs(res);
      document.title = "DealLens | Manage Blogs";
    }
    fetchData();
  }, [blogs , setAllBlogs]);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBlogs.length / PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const handleTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleTimeString('en-US', options);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);  
      const res = await deleteBlog(id);
      setSuccess(res?.message || 'Blog deleted successfully!');
      setSureModal(false);
    } catch (error) {
      setError(error.message);
      console.error('Error deleting blog:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <FileText className="text-teal-600" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Blogs</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search blogs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
              title="Grid view"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('plain')}
              className={`p-2 rounded-md ${viewMode === 'plain' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
              title="List view"
            >
              <List size={20} />
            </button>
          </div>

          <button
            onClick={() => navigate('/admin/blogs/editor')}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <PlusCircle size={18} />
            <span>Add Blog</span>
          </button>
        </div>
      </div>

      {/* Toast Messages */}
      {error && <ErrorToast message={error} onClose={() => setError(null)} />}
      {success && <SuccessToast message={success} onClose={() => setSuccess(null)} />}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">{blog.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={14} />
                  <span>{blog.author_name}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} />
                  <span>{handleTimestamp(blog.created_at)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} />
                  <span>{handleTime(blog.created_at)}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    blog.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {blog.status}
                  </span>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/admin/blogs/editor/${blog.id}`, { state: { blog } })}
                      className="text-teal-600 hover:text-teal-800 transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSureModal(true);
                        setSelectedBlog(blog);
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'plain' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedBlogs.map(blog => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-10 w-16 overflow-hidden rounded-md">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">{blog.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{blog.author_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        <div>{handleTimestamp(blog.created_at)}</div>
                        <div className="text-xs text-gray-400">{handleTime(blog.created_at)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        blog.status === 'Published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => navigate(`/admin/blogs/editor/${blog.id}`, { state: { blog } })}
                          className="text-teal-600 hover:text-teal-900 transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setSureModal(true);
                            setSelectedBlog(blog);
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors"
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
      )}

      {/* Empty State */}
      {paginatedBlogs.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="mx-auto max-w-md">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No blogs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {search || statusFilter !== 'All' 
                ? "Try adjusting your search or filter criteria." 
                : "Get started by creating a new blog post."}
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/admin/blogs/editor')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <PlusCircle className="-ml-1 mr-2 h-5 w-5" />
                Add Blog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * PER_PAGE + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * PER_PAGE, filteredBlogs.length)}</span> of{' '}
            <span className="font-medium">{filteredBlogs.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded-lg border text-sm ${
                    currentPage === pageNum ? 'bg-teal-600 text-white border-teal-600' : 'hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={sureModal}
        onerror={error}
        onsuccess={success}
        loading={loading}
        onClose={() => setSureModal(false)}
        onConfirm={() => handleDelete(selectedBlog?.id)}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
      />
    </div>
  );
};

export default ManageBlogs;