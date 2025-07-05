import { createContext, useState } from "react";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [isAdminClicked , setIsAdminClicked] = useState(false);
    return (
        <AdminContext.Provider value={{isAdminClicked , setIsAdminClicked}}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminProvider;
export { AdminContext };