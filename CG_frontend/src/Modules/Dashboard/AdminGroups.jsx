import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash, Users, Search, Loader } from "lucide-react";
import { Link, Route, Routes } from "react-router-dom";
import GroupModal from "./GroupModal";
import GroupDetails from "./GroupDetails";
import axios from "axios";
import { useAdminStore } from '../../Stores/store.js'
import CreateNewGroup from "./CreateNewGroup";
import AddUSerToGroup from "./AddUSerToGroup";
import Loading from "@/components/ui/Loading";
import AddTaskPopup from "./AddTaskPopup";


const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const [groups, setGroups] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isPopupOpen, setIsPopupOpen] = useState(false);



    const { groups, setGroups, deleteGroup } = useAdminStore()

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
            }
        };
        loadGroups();
    }, []);

    setTimeout(() => {
        setLoading(false)
    }, 800)


    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }



    const handleDelete = async (groupId) => {
        if (!groupId) {
            alert("Please provide a group ID.");
            return;
        }

        const result = await deleteGroup(groupId);

        if (result.success) {
            alert("Group deleted successfully!");
        } else {
            alert(result.message);
        }
    };





    const handleDeleteGroup = (id) => {
        setGroups(groups.filter((group) => group._id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 w-screen px-48">
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Student Groups Management</h1>
                <div className="flex items-center space-x-4">
                    {/* <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search groups..."
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div> */}
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                    >
                        Add Task
                    </button>
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                    >
                        Add User
                    </button>

                    {isPopupOpen && <AddTaskPopup onClose={() => setIsPopupOpen(false)} groups={groups} />}
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
                        {groups?.map((group) => (
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
                                <td className="flex space-x-">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <AddUSerToGroup groupid={group._id} />
                                    </button>
                                    <button onClick={() => handleDelete(group._id)} className="text-red-500 hover:text-red-700">
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