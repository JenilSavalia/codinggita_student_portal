import express from 'express'
import protect from '../Middlleware/protect.js'
import { AddNewGroup, addUsersToGroup, deleteUsersFromGroup, getGroup, AddTaskByGroupId, getAllGroup, FindGroupByPermissionTutor, updateTutorAccess, deleteGroupByID, GetGroupsForStudent } from '../Controller/Group.Controller/Group.Controller.js';


const GroupRoute = express.Router()

// Group Routes


// Get all groups
GroupRoute.get("/all", getAllGroup)

// Get all groups
GroupRoute.get("/student/:userID", GetGroupsForStudent)


// Get all groups which Tutor has Permission
GroupRoute.get("/tutor", FindGroupByPermissionTutor)


// Add/Remove Tutors access from groups 
GroupRoute.put("/tutor", updateTutorAccess)


// Add Tutor Access:
// {
//     "groupId": "64f1a2b3c4d5e6f7a8b9c0d1",
//     "tutorId": "64f1a2b3c4d5e6f7a8b9c0d2",
//     "action": "add"
// }


// Remove Tutor Access:
// {
//     "groupId": "64f1a2b3c4d5e6f7a8b9c0d1",
//     "tutorId": "64f1a2b3c4d5e6f7a8b9c0d2",
//     "action": "remove"
// }






// Get a Group by ID  (used in user frontend rendering)
GroupRoute.get("/", getGroup)


// Create New Group
GroupRoute.post("/", AddNewGroup);


// Add a User To Group
GroupRoute.put("/", addUsersToGroup);


// Delete Group
GroupRoute.delete("/:groupId", deleteGroupByID);


// Delete User From Group by Group ID
GroupRoute.delete("/user", deleteUsersFromGroup);



// Task Routes

// Add Task to Group By Group ID
GroupRoute.post("/task/:groupID", AddTaskByGroupId);

export default GroupRoute