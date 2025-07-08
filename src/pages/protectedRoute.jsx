import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import LoadingSpinner from '../lib/Loading';

const ProtectedRoute = ({ children }) => {
    const { adminData, setAdminData } = useContext(AdminContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedAdmin = localStorage.getItem('adminData');
        const accessToken = localStorage.getItem('access_token');

        if (savedAdmin && accessToken) {
            setAdminData(JSON.parse(savedAdmin));
        }
        
        setLoading(false);
    }, [setAdminData]);

    if (loading) return <LoadingSpinner />

    const accessToken = localStorage.getItem('access_token');

    if (!adminData?.user || !accessToken) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
