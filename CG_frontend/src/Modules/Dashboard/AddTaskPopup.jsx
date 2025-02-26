import React, { useState } from "react";
import { X, Search, Calendar, ChevronDown } from "lucide-react";
import { authStore, useAdminStore } from "@/Stores/store";

const AddTaskPopup = ({ onClose, groups }) => {
  const [taskName, setTaskName] = useState("");
  const [assignTo, setAssignTo] = useState(null);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = authStore();
  const { addTaskToGroup } = useAdminStore();

  const filteredUsers = groups.filter((item) =>
    item.group_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      taskName,
      dueDate,
      priority,
      createdBy: user._id, // Replace with logged-in user's ID
    };

    console.log(assignTo.id)
    console.log(taskData)

    try {
      await addTaskToGroup(assignTo.id, taskData);
      alert('Task added successfully!');
      setTaskName('');
      setDueDate('');
      setPriority('Medium');
    } catch (error) {
      alert(error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add New Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assign to</label>
            <div className="relative mt-1">
              <input
                type="text"
                value={assignTo?.name}
                onChange={(e) => setAssignTo(e.target.value)}
                onInput={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
              <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md">
              {filteredUsers.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setAssignTo({ id: item._id, name: item.group_name })}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item.group_name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <div className="relative mt-1">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
              <Calendar size={18} className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <div className="relative mt-1">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm appearance-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopup;