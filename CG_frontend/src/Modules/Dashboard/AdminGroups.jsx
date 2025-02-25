import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash, Users, Search } from "lucide-react";
import { Link, Route, Routes } from "react-router-dom";
import GroupModal from "./GroupModal";
import GroupDetails from "./GroupDetails";
import axios from "axios";
import { useAdminStore } from '../../Stores/store.js'
import CreateNewGroup from "./CreateNewGroup";


const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const [groups, setGroups] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const { groups, setGroups } = useAdminStore()

    console.log(groups)


    const fetchAllGroups = async () => {
        try {
            // Make a GET request to the backend API endpoint
            const response = await axios.get('http://localhost:8080/group/all', {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('token')}`,
                // },
            });

            // Check if the response is successful
            if (response.status === 200) {
                // Return the fetched groups
                return response.data.Groups;
            } else {
                // Handle unexpected response status
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            // Handle errors
            console.error("Error fetching groups:", error);
            throw error; // Re-throw the error for further handling
        }
    };


    useEffect(() => {
        const loadGroups = async () => {
            try {
                const data = await fetchAllGroups();
                console.log(data)
                setGroups(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadGroups();
    }, []);

    if (loading) {
        return <div>Loading groups...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }









    const handleDeleteGroup = (id) => {
        setGroups(groups.filter((group) => group._id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 w-screen px-48">
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Student Groups Management</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search groups..."
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        <Plus size={20} className="mr-2" />
                        Create New Group
                    </button> */}
                    <CreateNewGroup />
                </div>
            </header>

            {/* Groups Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Group Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Members</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leader</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {groups.map((group) => (
                            <tr key={group._id}>
                                <td className="px-6 py-4">
                                    <Link to={`/dashboard/admin/groups/${group._id} `} className="text-blue-500 hover:underline">
                                        {group.group_name}
                                    </Link>
                                </td>
                                <td className="px-6 py-4">{group.users.length}</td>
                                <td className="px-6 py-4">{group.created_by}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">Active</span>
                                </td>
                                <td className="px-6 py-4 flex space-x-4">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDeleteGroup(group.id)} className="text-red-500 hover:text-red-700">
                                        <Trash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && <GroupModal onClose={() => setIsModalOpen(false)} />}

        </div>
    );
};

export default App;