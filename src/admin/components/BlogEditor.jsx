import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCircle, FileText, UploadCloud, Save, Image, Plus, X, Link } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';
import { createBlog } from '../../api/apiBlogs';
import ErrorToast from '../../lib/ErrorToast';
import SuccessToast from '../../lib/SuccessToast';

const BlogEditor = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { adminData, adminUser } = useContext(AdminContext);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Draft');
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const blogData = {
    title: title,
    content: content,
    tags: tags, 
    status: status,
    image: image,
    author_name: adminUser?.name,
    author_email: adminUser?.email
  };
  
const handleCreateBlogs = async () => {
  try {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    const res = await createBlog(blogData);
    setSuccess(res?.message || 'Blog created successfully!');
    
  } catch (error) {
    console.error('Error creating blog:', error);
    setError("Failed to create blog. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
 
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-teal-50">
            <FileText size={24} className="text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create New Blog Post</h2>
        </div>
        {error && (
          <ErrorToast message={error} show={true} onClose={() => setError(null)} />
        )}
        {success && (
          <SuccessToast message={success} show={true} onClose={() => setSuccess(null)} />
        )}
        <button 
          onClick={() => navigate('/admin/blogs')} 
          className="flex items-center space-x-2 text-sm bg-white hover:bg-gray-50 text-teal-600 border border-teal-600 px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Blogs</span>
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Writing Area */}
        <div className="flex-1 space-y-6">
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input 
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              type="text" 
              placeholder="Your amazing blog title..." 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg text-lg font-semibold focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea 
              onChange={(e) => setContent(e.target.value)}
              id="content"
              placeholder="Write your blog content here..."
              className="w-full min-h-[400px] border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition shadow-sm"
            ></textarea>
          </div>
          <div className="space-y-2">
            <label htmlFor="cover-image-url" className="block text-sm font-medium text-gray-700">
              Cover Image URL
            </label>
            <div className="mt-1">
              <input
                id="cover-image-url"
                type="url"
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Enter the full URL of your cover image (PNG, JPG, GIF)
            </p>
          </div>
          <div className="space-y-1">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
            <div className="flex flex-wrap gap-2 items-center">
              {tags.map(tag => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1.5 inline-flex text-teal-600 hover:text-teal-900 focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              <div className="flex items-center">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Add tag..."
                  className="border border-gray-300 rounded-l-lg px-3 py-1 text-sm focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-teal-500 text-white px-2 py-1 rounded-r-lg hover:bg-teal-600 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Author Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-teal-100 rounded-full">
                <UserCircle size={32} className="text-teal-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{adminUser ? adminUser.name : "Admin"}</h4>
                <p className="text-sm text-gray-500">{adminData.user.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select onClick={(e) => setStatus(e.target.value)} name="status" className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition">
                <option value={"Draft"}>Draft</option>
                <option value={"Published"}>Published</option>
              </select>
            </div>

            {/* <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Publish Date</label>
              <input 
                type="datetime-local" 
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div> */}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button onClick={handleCreateBlogs} className="w-full flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-lg transition shadow-sm">
              <UploadCloud size={18} />
              <span>{isLoading? "Publishing..." : "Publish Now"}</span>
            </button>
            <button  className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2.5 rounded-lg transition shadow-sm">
              <Save size={18} />
              <span>{isLoading? "Saving..." : "Save as Draft"}</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2.5 rounded-lg transition shadow-sm">
              <span>{isLoading? "Previewing..." : "Preview"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;