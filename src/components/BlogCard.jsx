import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { Element } from 'react-scroll';
const BlogsCard = () => {
 const {getAllBlogs} = useContext(AdminContext);
 const blogs = getAllBlogs;
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const navigate = useNavigate();
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Element name='blog'>
        <section className="py-10 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Latest Blog Posts</h2>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {currentBlogs.map((blog, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-5 space-y-3">
                    <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                    <p className="text-sm text-gray-600">{blog.description}</p>
                    <span onClick={()=>navigate(`/blogs/${blog.id}`)} className="text-[#18f2d2] text-sm font-medium hover:underline">
                    Read More →
                    </span>
                </div>
                </div>
            ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-2 mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 text-sm rounded-md ${
                    currentPage === index + 1
                    ? 'bg-[#18f2d2] text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
                >
                {index + 1}
                </button>
            ))}
            </div>
        </div>
        </section>
    </Element>
  );
};

export default BlogsCard;
