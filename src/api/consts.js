import axios from "axios";


const BASE_URL = '    'https://wishlist-tool-frontend.onrender.com/api';

export const fetchResult = async (url) => {
    try {
        const res =  await fetch(`${BASE_URL}/scraper/compair?productURL=${url}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const getUserByID = async (id) =>{
    try {
        const res = await fetch(`${BASE_URL}/admin/users/${id}`);
        return res.json();
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error(error.message);
    }
}

export const adminLogin = async (email , password) =>{
    try {
        const res = await fetch(`${BASE_URL}/admin/login`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ email, password }),
         });
    
    return res.json(); 
    } catch (error) {
        console.error('Error during admin login:', error);
        throw new Error(error.message);
    }
}

export const LogoutUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/logout`, {
    });
    return res.json();
  } catch (error) {
    console.error('Error during logout:', error);
    throw new Error(error.message);
  }
};


const createUser = async (userData) => {
    try {
        const res = await axios.post(`${BASE_URL}/admin/users`, userData);
        return res.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(error.message);
    }
}

const updateUser = async (userId, userData) => {
    try {
        const res = await axios.put(`${BASE_URL}/admin/users/${userId}`, userData);
        return res.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error(error.message);
    }
}

const createScraberData = async(userData) =>{
    console.log(userData);
    
    try {
        const res = axios.post(`${BASE_URL}/scraper/createScraperData` ,userData );
        return res.then(res => {
            return res.data;
        });
    } catch (error) {
        console.error('Error updating user:', error);
    }
    
}

const getAllScraberData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/scraper/getAllScraperData`);
    return res.data;
  } catch (error) {
    console.error('Error fetching scraper data:', error);
    return []; // Safe fallback so your app doesn't crash
  }
};

const visit = async () => {
  const res = await axios.post(`${BASE_URL}/visit`);
  return res.data;
}

const visits = async () => {
  const res = await axios.get(`${BASE_URL}/visits`);
  return res.data;
}

const deleteUser = async (userId) => {
    try {
        const res = await axios.delete(`${BASE_URL}/admin/users/${userId}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error(error.message);
    }
}

const fetchedUsers = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/admin/users`);

        return res.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error(error.message);
    }
}

const api = {fetchResult , visit , visits , getAllScraberData , createScraberData , getUserByID , adminLogin , LogoutUser , createUser , updateUser , deleteUser , fetchedUsers};
export default api