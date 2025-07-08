import React, { useContext, useEffect } from 'react';
import { Users, FileText, BarChart, Activity } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';

const AdminDashboard = () => {
  const { allUser, getAllBlogs, scraberData, visits } = useContext(AdminContext);

  useEffect(() => {
    document.title = "DealLens | Admin Dashboard";
  }, []);

  // Take latest 5 entries (assuming latest are at the end)
  const recentScraps = [...scraberData].reverse().slice(0, 5);

  return (
    <div className="p-6 w-full space-y-10">

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <StatCard title="Total Users" value={allUser.length} icon={<Users />} />
        {/* Total Blogs */}
        <StatCard title="Total Blogs" value={getAllBlogs.length} icon={<FileText />} />
        {/* Total Scrabs */}
        <StatCard title="Total Scrabs" value={scraberData.length} icon={<Activity />} />
        {/* Website Visits */}
        <StatCard title="Website Visits" value={visits.length} icon={<BarChart />} />
      </div>

      {/* Recent Scraper Activity */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Scraper Activity</h2>
        {recentScraps.length === 0 ? (
          <p className="text-gray-500">No recent activity found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {recentScraps.map((item, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{item.username || "Untitled Item"}</p>
                  <p className="text-sm text-gray-500 truncate max-w-[500px]">{item.producturl  || "Unknown Source"}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(item.created_at || item.date || Date.now()).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

// Reusable StatCard component (inside same file or extract)
const StatCard = ({ title, value, icon }) => (
  <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-[#18f2d2]">{value || 0}</p>
      </div>
      <div className="bg-[#18f2d2]/20 p-3 rounded-full text-[#18f2d2]">
        {React.cloneElement(icon, { size: 28 })}
      </div>
    </div>
  </div>
);
