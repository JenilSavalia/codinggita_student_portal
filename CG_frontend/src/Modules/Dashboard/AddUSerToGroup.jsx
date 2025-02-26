import React, { useState, useEffect } from 'react';
import { Search, Plus, X, Users, CheckCircle, Edit, Trash } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { authStore, useAdminStore } from '@/Stores/store';



const AddUSerToGroup = ({ groups }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [showCreateGroup, setShowCreateGroup] = useState(false);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addUsersToGroup } = useAdminStore()

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/user', {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('token')}`,
                // },
            });
            if (response.status === 200) {
                return response.data.Users;
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching Users:", error);
            throw error;
        }
    };


    useEffect(() => {
        const loadGroups = async () => {
            try {
                const data = await fetchAllUsers();
                console.log(data)
                setUsers(data);
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



    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUserSelect = (user) => {
        console.log(selectedUsers)
        if (selectedUsers.find(u => u._id === user._id)) {
            setSelectedUsers(selectedUsers.filter(u => u._id !== user._id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleCreateGroup = async () => {

        const members = selectedUsers.map((item) => item._id)

        // Ensure required fields are filled
        if (selectedUsers.length > 0) {

            try {
                const result = await addUsersToGroup(groupid, members);

                if (result.success) {
                    console.log("Users Added successfully!");

                    // Reset state only if the group creation is successful
                    setSelectedUsers([]);
                    setShowCreateGroup(false);
                } else {
                    console.error("Failed to Add Users:", result.message);
                }
            } catch (err) {
                console.error("Error Adding USers:", err); // Improved error logging
            }
        } else {
            console.error("Group ID and at least one member are required.");
        }
    };




    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className=" justify-between items-center">

                <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Edit size={10} /> Add Users 
                        </Button>

                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Users</DialogTitle>
                            <DialogDescription>
                                Select members to add
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            <div className="relative mb-4">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {selectedUsers.map(user => (
                                        <div key={user._id} className="bg-blue-100 rounded-full px-3 py-1 text-sm flex items-center gap-1">
                                            {user.name}
                                            <X
                                                size={14}
                                                className="cursor-pointer"
                                                onClick={() => handleUserSelect(user)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="max-h-48 overflow-y-auto border rounded-md">
                                    {filteredUsers.map(user => (
                                        <div
                                            key={user._id}
                                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                            onClick={() => handleUserSelect(user)}
                                        >
                                            <div>
                                                <div>{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                            {selectedUsers.find(u => u._id === user._id) && (
                                                <CheckCircle size={16} className="text-green-500" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button onClick={handleCreateGroup} disabled={selectedUsers.length === 0}>
                                Add Users
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default AddUSerToGroup;