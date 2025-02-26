import React from 'react';
import { User, Calendar, FolderPlus, UserCircle, Clock, LogOut, Settings } from 'lucide-react';


const StudentDashboard = () => {
  return (
    <>
  
      <div className="min-h-screen bg-gray-900 text-gray-100 w-full">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6 p-6 ">

          {/* User Section - Compact Header */}
          <div className="col-span-12 bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-sm text-gray-400">Computer Science</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="p-2 hover:bg-gray-700 rounded-full">
                <Settings size={20} />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-full text-red-400">
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Main Actions Grid */}
          <div className="col-span-12 grid md:grid-cols-2 gap-6">
            {/* Post Event Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="text-purple-500" size={24} />
                <h3 className="text-xl font-semibold">Post a Event</h3>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  placeholder="Event Description"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="3"
                />
                <div className="flex space-x-4">
                  <input
                    type="date"
                    className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Post Event
                  </button>
                </div>
              </form>
            </div>

            {/* Add Project Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FolderPlus className="text-blue-500" size={24} />
                <h3 className="text-xl font-semibold">Add a Project</h3>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Project Description"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Project
                  </button>
                </div>
              </form>
            </div>

            {/* Edit Portfolio Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <UserCircle className="text-green-500" size={24} />
                <h1 className="text-xl font-semibold">Edit Portfolio</h1>
              </div>
              <div className="space-y-4">
                <p className="text-gray-400">Update your professional profile and showcase your achievements.</p>
                <button
                  className="w-full bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Edit Portfolio</span>
                </button>
              </div>
            </div>

            {/* Apply for Leave Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="text-orange-500" size={24} />
                <h3 className="text-xl font-semibold">Apply for Leave</h3>
              </div>
              <form className="space-y-4">
                <select className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Select Leave Type</option>
                  <option>Sick Leave</option>
                  <option>Personal Leave</option>
                  <option>Academic Leave</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="From Date"
                  />
                  <input
                    type="date"
                    className="bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="To Date"
                  />
                </div>
                <textarea
                  placeholder="Reason for Leave"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="2"
                />
                <button
                  type="submit"
                  className="w-full bg-orange-600 px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;