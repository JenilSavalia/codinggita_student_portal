import React from "react";
import { Link, useParams } from "react-router-dom";
import { Users, ClipboardList, ArrowLeft } from "lucide-react";
import { useAdminStore } from '../../Stores/store.js'


const GroupDetails = () => {
  const { groupId } = useParams();

  const groups = useAdminStore((state) => state.groups);
  console.log(groups)

  const group = groups.find((g) => g._id === groupId);


  // if (!group) {
  //   return <div>Group not found!</div>;
  // }

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/dashboard/admin/groups" className="flex items-center text-blue-500 hover:text-blue-700 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Groups
        </Link>

        {/* Group Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">{group?.group_name}</h2>
          <p className="text-gray-600 mb-6">{group?.description || "No description available."}</p>

          {/* Members Section */}
          <div className="mb-8">
            <h3 className="flex items-center text-xl font-semibold mb-4">
              <Users size={20} className="mr-2" />
              Members
            </h3>
            <ul className="space-y-2">
              {group.users.map((item, index) => (
                <li key={item._id} className="text-gray-700">
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Tasks Section */}
          <div>
            <h3 className="flex items-center text-xl font-semibold mb-4">
              <ClipboardList size={20} className="mr-2" />
              Tasks
            </h3>
            <ul className="space-y-2">
              {group.tasks.map((item, index) => (
                <li key={index} className="text-gray-700">
                  Task {index + 1}: {item.task_title}  - {item.due_date}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div >
  );
};

export default GroupDetails;