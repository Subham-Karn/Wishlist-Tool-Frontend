import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import {
  FiArrowLeft, FiShare2, FiFacebook, FiTwitter, FiLinkedin, FiCopy
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const BlogView = () => {
  const { getAllBlogs } = useContext(AdminContext);
  const { id } = useParams();
  const blog = getAllBlogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center p-6">
        <div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-500 mb-6">Oops! The blog you're looking for doesn’t exist.</p>
          <Link to="/blogs" className="inline-flex items-center px-5 py-2.5 bg-[#18f2d2] text-white rounded hover:bg-[#15d9ba]">
            <FiArrowLeft className="mr-2" /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const relatedBlogs = getAllBlogs.filter(b => b.id !== id && b.status === 'Published').slice(0, 3);
  const tags = blog.tags || [];
 console.log(relatedBlogs);
 
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Breadcrumb Header */}
      <div className="max-w-6xl mx-auto px-4 pt-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-[#18f2d2]">Home</Link> /
        <Link to="/blogs" className="hover:text-[#18f2d2] ml-1">Blogs</Link> /
        <span className="ml-1 text-gray-800">{blog.title}</span>
      </div>

      {/* Hero Image */}
      {blog.image && (
        <div className="w-full h-[50vh] mt-4">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover object-center rounded-md"
          />
        </div>
      )}

      {/* Blog Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          {blog.title}
        </h1>

        {/* Meta */}
        <div className="text-sm text-gray-500 mb-10">
          {new Date(blog.created_at).toLocaleDateString()} 
          {blog.author_name && <span> • By {blog.author_name}</span>}
        </div>

        {/* Content */}
        <article className="prose prose-lg prose-neutral max-w-none mb-10">
          <div className="whitespace-pre-line leading-relaxed">
            {blog.content}
          </div>
        </article>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map((tag, i) => (
              <span key={i} className="bg-[#18f2d2]/10 text-[#18f2d2] px-3 py-1 rounded-full text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold mb-4 flex items-center">
            <FiShare2 className="mr-2" /> Share this article
          </h3>
          <div className="flex gap-3">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><FiFacebook /></a>
            <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><FiTwitter /></a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><FiLinkedin /></a>
            <a href={`https://api.whatsapp.com/send?text=${window.location.href}`} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><FaWhatsapp /></a>
            <button onClick={copyToClipboard} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><FiCopy /></button>
          </div>
        </div>
      </main>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-200 py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((b) => (
                <Link key={b.id} to={`/blogs/${b.id}`} className="group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                  {b.image && (
                    <img src={b.image} alt={b.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200" />
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[#18f2d2] transition">{b.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{b.content}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(b.created_at).toLocaleDateString()}
                      {b.author_name && ` • ${b.author_name}`}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogView;
