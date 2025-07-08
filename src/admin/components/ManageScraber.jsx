import React, { useContext, useState } from 'react';
import { Copy, ExternalLink, Calendar, User, Mail, Search, Grid, List, ChevronDown, ChevronUp } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';
import ErrorToast from '../../lib/ErrorToast';
import LoadingSpinner from '../../lib/Loading';

const ScraperDataCard = ({ data, viewMode }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };
  const handleDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const handleTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleTimeString('en-US', options);
  }
  return viewMode === 'grid' ? (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 h-full hover:shadow-lg transition-shadow">
      <div className="bg-[#18f2d2] p-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span className="truncate">{data.username}'s Search</span>
        </h3>
      </div>
       
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">ID:</span>
          <div className="flex items-center">
            <span className="text-xs font-mono text-gray-800 truncate max-w-[100px]">{data.id}</span>
            <button 
              onClick={() => copyToClipboard(data.id)}
              className="text-gray-500 hover:text-gray-700 ml-2"
            >
              <Copy className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Date:</span>
          <span className="text-xs text-gray-800 flex gap-2">
            {handleDate(data.searchat)}
            {handleTime(data.searchat)}
          </span>
        </div>

          <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Prduct Url:</span>
          <span className="text-xs truncate text-gray-800">
           { data.producturl}
          </span>
        </div>

        <button className="w-full mt-2 py-1 px-3 text-xs font-medium text-white bg-[#18f2d2] rounded-md hover:bg-[#18f2d2]/80 flex items-center justify-center">
          View Details
        </button>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="p-4 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-3 flex items-center">
          <div className="bg-[#18f2d2] text-white p-2 rounded-full mr-3">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{data.username}</p>
            <p className="text-xs text-gray-500">{data.useremail}</p>
          </div>
        </div>

        <div className="col-span-4">
          <div className="text-xs text-gray-500 mb-1">Product URL</div>
          <a 
            href={data.producturl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline truncate block"
          >
            {data.producturl}
          </a>
        </div>

        <div className="col-span-2">
          <div className="text-xs text-gray-500 mb-1">Date</div>
          <p className="text-xs text-gray-800 flex gap-2">
            {handleDate(data.searchat)}
            <br />
            {handleTime(data.searchat)}
          </p>
        </div>

        <div className="col-span-3 flex justify-end space-x-2">
          <button 
            onClick={() => copyToClipboard(data.id)}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            title="Copy ID"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
            <ExternalLink className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageScraberData = () => {
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
    setExpandedCard(null);
  };

  const handleDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const handleTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleTimeString('en-US', options);
  }

  const {scraberData , error , Loading , setError} = useContext(AdminContext);
  const filteredData = scraberData.filter(item =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.useremail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.producturl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Manage Scraper</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Search and View Controls */}
        {error && <ErrorToast message={error} show={true} onClose={() => setError(null)} />}
        {Loading && <LoadingSpinner />}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 w-full left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-[60vw] py-3 pl-10 pr-3  border border-gray-300 rounded-md leading-5  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#18f2d2] focus:border-[#18f2d2] sm:text-sm"
              placeholder="Search scraper data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-[#18f2d2] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-[#18f2d2] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Data Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((data, index) => (
              <ScraperDataCard key={index} data={data} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {/* List Header */}
            <div className="bg-[#18f2d2] p-4 rounded-t-lg grid grid-cols-12 gap-4">
              <div className="col-span-3 text-white text-sm font-medium">User</div>
              <div className="col-span-4 text-white text-sm font-medium">Product URL</div>
              <div className="col-span-2 text-white text-sm font-medium">Date</div>
              <div className="col-span-3 text-white text-sm font-medium text-right">Actions</div>
            </div>
            
            {/* List Items */}
            {filteredData.map((data, index) => (
              <React.Fragment key={index}>
                <ScraperDataCard data={data} viewMode={viewMode} />
                {expandedCard === index && (
                  <div className="bg-white p-4 border border-t-0 border-gray-200 rounded-b-lg shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">Tracking ID</h4>
                        <div className="flex items-center">
                          <p className="text-xs font-mono text-gray-800">{data.id}</p>
                          <button 
                            onClick={() => copyToClipboard(data.id)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>          
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">Full Date</h4>
                        <p className="text-xs text-gray-800 flex gap-2">
                          {handleDate(data.searchat)}
                          {handleTime(data.searchat)}
                        </p>
                      </div>
                      
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageScraberData;