import { createContext, useEffect, useState } from "react";
import { getUserByID } from "../api/consts";
import api from "../api/consts";
import { fetchBlogs } from "../api/apiBlogs";
const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [isAdminClicked , setIsAdminClicked] = useState(false);
    const [adminData , setAdminData] = useState(null);
    const [trackNavigation, setTrackNavigation] = useState('dashboard');
    const [adminUser , setAdminUser] = useState(null);
    const [Loading , setLoading] = useState(false);
    const [error , setError] = useState(null);
    const [success , setSuccess] = useState(null);
    const [allUser , setAllUser] = useState([]);
    const [scraberData , setScraberData] = useState([]);
    const [getAllBlogs , setAllBlogs] = useState([]);
    const [visits , setVisits] = useState(0);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const user = await getUserByID(adminData?.user?.id);
                const allUsers = await api.fetchedUsers();
                await api.visit();
                const scrabersData = await api.getAllScraberData();
                const visits = await api.visits();
                 setVisits(visits.data);
                 
                setScraberData(scrabersData);
                setAllUser(allUsers);
                setAdminUser(user);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setError(error.message);
                setLoading(false);
            }
        };
        if (adminData) {
            fetchUser();
        }
    }, [adminData]);
    
      useEffect(() => {
         const handleBlogs = async () => {
            const res = await fetchBlogs(); 
            setAllBlogs(res); 
         }  
         handleBlogs();
      }, []);
    return (
        <AdminContext.Provider value={{
            isAdminClicked , 
            setIsAdminClicked,
            adminData ,
            setAdminData,
            trackNavigation,
            setTrackNavigation,
            adminUser,
            error,
            setError,
            success,
            setSuccess,
            Loading,
            setLoading,
            allUser,
            scraberData,
            setScraberData,
            getAllBlogs,
            setAllBlogs,
            visits
            }}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminProvider;
export { AdminContext };