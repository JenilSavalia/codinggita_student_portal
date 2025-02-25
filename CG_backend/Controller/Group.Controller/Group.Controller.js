import { Group } from '../../Model/Group.Model.js'
import { User } from '../../Model/User.Model.js'
import mongoose from 'mongoose'


// Task Controllers


// Get ALl Groups
export const getAllGroup = async (req, res) => {
    try {
        // Step 1: Find the group by ID and populate the 'users' field
        const group = await Group.find().populate({
            path: 'users',
            select: 'name email'
        });

        // Step 2: Check if the group exists
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Step 3: Send success response
        res.json({ message: "Groups fetched successfully", Groups: group });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Failed to get Group" });
    }
};

// Get all groups which Tutor has Permission
export const FindGroupByPermissionTutor = async (req, res) => {
    const { tutorId } = req.body;

    // Validate tutorId
    if (!tutorId) {
        return res.status(400).json({ error: "Tutor ID is required" });
    }

    try {
        // Step 1: Find groups where the tutor has permissions
        const groups = await Group.find({ 'permissions.tutorId': tutorId })
            .populate({
                path: 'users',
                select: 'name email'
            })
            .populate({
                path: 'created_by',
                select: 'name email'
            });

        // Step 2: Check if any groups were found
        if (groups.length === 0) {
            return res.status(404).json({ error: "No groups found for this tutor" });
        }

        // Step 3: Send success response
        res.json({ message: "Groups fetched successfully", groups });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Failed to fetch groups" });
    }
};


// Update Tutors Access to group
export const updateTutorAccess = async (req, res) => {
    const { groupId, tutorId, action } = req.body;

    // Validate groupId and tutorId
    if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(tutorId)) {
        return res.status(400).json({ error: "Invalid group ID or tutor ID" });
    }

    // Validate action (add or remove)
    if (!["add", "remove"].includes(action)) {
        return res.status(400).json({ error: "Invalid action. Use 'add' or 'remove'." });
    }

    try {
        // Step 1: Find the group
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Step 2: Check if the tutor already has access
        const tutorIndex = group.permissions.findIndex(perm => perm.tutorId.toString() === tutorId.toString());

        if (action === "add") {
            // Add tutor access
            if (tutorIndex !== -1) {
                return res.status(400).json({ error: "Tutor already has access to this group" });
            }

            group.permissions.push({ tutorId });
        } else if (action === "remove") {
            // Remove tutor access
            if (tutorIndex === -1) {
                return res.status(400).json({ error: "Tutor does not have access to this group" });
            }

            group.permissions.splice(tutorIndex, 1);
        }

        // Step 3: Save the updated group
        await group.save();

        // Step 4: Send success response
        res.json({ message: `Tutor access ${action === "add" ? "added" : "removed"} successfully`, group });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Failed to update tutor access" });
    }
};

// Get a group from array of ID's
export const getGroup = async (req, res) => {
    // Assuming groupIDs is passed as an array in the request body or query params
    const { groupIDs } = req.body;

    // Validate groupIDs
    if (!Array.isArray(groupIDs) || groupIDs.length === 0) {
        return res.status(400).json({ error: "Invalid group IDs" });
    }

    // Validate each groupID in the array
    for (const groupID of groupIDs) {
        if (!mongoose.Types.ObjectId.isValid(groupID)) {
            return res.status(400).json({ error: `Invalid group ID: ${groupID}` });
        }
    }

    try {
        // Step 1: Find all groups by IDs and populate the 'users' field
        const groups = await Group.find({
            _id: { $in: groupIDs }
        }).populate({
            path: 'users',
            select: 'name email'
        });

        // Step 2: Check if any groups were found
        if (!groups || groups.length === 0) {
            return res.status(404).json({ error: "No groups found" });
        }

        // Step 3: Send success response
        res.json({ message: "Groups fetched successfully", Groups: groups });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Failed to get Groups" });
    }
};

// Create A new Group
export const AddNewGroup = async (req, res) => {
    const { group_name, users, created_by, description, tasks, permissions } = req.body;

    try {
        // Create new group
        const newGroup = new Group({
            group_name,
            description,
            users, // Array of User IDs
            created_by, // ID of the user who created the group
            tasks, // Array of tasks (if provided)
            permissions // Array of tutor permissions (if provided)
        });

        await newGroup.save();

        // Update each user's document with the new group ID
        await User.updateMany(
            { _id: { $in: users } }, // Find users with IDs in the array
            { $addToSet: { groups: newGroup._id } } // Prevents duplicate group IDs
        );

        // Send success response
        res.status(201).json({ message: "Group added successfully", group: newGroup });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to add group" });
    }
};

// Add users to Group
export const addUsersToGroup = async (req, res) => {

    const { groupId, userIds } = req.body;

    try {

        // Step 1: Find the group
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Step 3: Filter out users already in the group
        const newUserIds = userIds.filter(userId => !group.users.includes(userId));

        if (newUserIds.length === 0) {
            return res.status(400).json({ error: "All users are already in the group" });
        }

        // Step 4: Add users to the group
        group.users.push(...newUserIds);
        await group.save();

        // Step 5: Add the group to each user
        await User.updateMany(
            { _id: { $in: newUserIds } },
            { $push: { groups: groupId } }
        );

        // Step 6: Send success response
        res.json({ message: "Users added to group successfully", group });


    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Failed to add User" });
    }
};

// Delete Users From Group 
export const deleteUsersFromGroup = async (req, res) => {
    const { groupId, userIds } = req.body;
    try {

        // Step 1: Find the group
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Step 2: Check if the users are in the group
        const usersInGroup = userIds.filter(userId => group.users.includes(userId));

        if (usersInGroup.length === 0) {
            return res.status(400).json({ error: "No users to delete from the group" });
        }

        // Step 3: Remove users from the group
        group.users = group.users.filter(id => !userIds.includes(id.toString()));
        await group.save();

        // Step 4: Remove the group from each user
        await User.updateMany(
            { _id: { $in: usersInGroup } },
            { $pull: { groups: groupId } }
        );

        // Step 5: Send success response
        res.json({ message: "Users deleted from group successfully", group });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Failed to add Group" });
    }
};


// Delete Group by Id 
export const deleteGroupByID = async (req, res) => {
    const { groupId } = req.params;

    try {
        // Step 1: Find the group to be deleted
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Step 2: Remove the group ID from all users who are members of the group
        await User.updateMany(
            { _id: { $in: group.users } }, // Find users who are in the group
            { $pull: { groups: groupId } } // Remove the group ID from their `groups` array
        );

        // Step 3: Delete the group from the database
        await Group.findByIdAndDelete(groupId);

        // Step 4: Send a success response
        res.json({ message: "Group deleted successfully" });
    } catch (error) {
        console.error("Error deleting group:", error);
        res.status(500).json({ error: "Failed to delete group" });
    }
};


// Task Controllers


// Add Task to group by ID
export const AddTaskByGroupId = async (req, res) => {

    const { groupID } = req.params
    const { task } = req.body;

    // Validate groupID
    if (!mongoose.Types.ObjectId.isValid(groupID)) {
        return res.status(400).json({ error: "Invalid group ID" });
    }

    console.log(task)

    // Validate the task object
    if (!task || !task.task_title || !task.due_date || !task.Priority || !task.created_by) {
        return res.status(400).json({ error: "Invalid task data" });
    }


    try {

        const group = await Group.findById(groupID);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        group.tasks.push(task);
        await group.save();

        const populatedGroup = await Group.findById(groupID)
            .populate('tasks.created_by', 'name email');

        res.json({ message: "Task Added successfully", task: task, populatedGroup });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Failed to add task" });
    }
};


