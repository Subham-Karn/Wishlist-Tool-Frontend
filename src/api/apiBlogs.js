import axios from "axios";
const BASE_URL = 'https://watchlist-price-compairesion-server.onrender.com/api';
export const fetchBlogs = async () => {
    try {
        const response = await fetch(`${BASE_URL}/blog/blogs`);
        if (!response.ok) {
        throw new Error('Failed to fetch blogs');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
}

export const createBlog = async (blogData) =>{
    try {
        const res = await axios.post(`${BASE_URL}/blog/blogs`, blogData);
        return await res.data;
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
}

export const deleteBlog = async (blogId) => {
    try {
        const response = await fetch(`${BASE_URL}/blog/${blogId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete blog');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
}
export const updateBlog = async (blogId, blogData) => {
    try {
        const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData),
        });
        if (!response.ok) {
            throw new Error('Failed to update blog');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
}

export const getBlogbyId = async (blogId) => {
    try {
        const response = await fetch(`${BASE_URL}/blogs/${blogId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching blog:', error);
        throw error;
    }
}