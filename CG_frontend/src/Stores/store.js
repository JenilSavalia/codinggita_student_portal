import { create } from "zustand";
import axios from "axios";

export const authStore = create((set, get) => ({
    user: JSON.parse(localStorage.getItem("user")) || null, // Get stored user
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),

    // 🔹 Register and Auto-Login
    register: async (name, email, password) => {
        try {
            const res = await axios.post("http://localhost:8080/auth/register", { name, email, password });
            const { token, User } = res.data;

            // Store token and user data
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(User)); // Store user in localStorage

            set(() => ({
                user: User,  // Store actual user object
                token: token,
                isAuthenticated: true,
            }));

            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.error || "Registration failed" };
        }
    },

    // 🔹 Login
    login: async (email, password) => {
        try {
            const res = await axios.post("http://localhost:8080/auth/login", { email, password });
            const { token, User } = res.data;

            // Store token and user data
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(User));

            set(() => ({
                user: User,  // Store actual user object
                token: token,
                isAuthenticated: true
            }));

            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.error || "Login failed" };
        }
    },

    // 🔹 Logout
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // Remove user data
        set({ user: null, token: null, isAuthenticated: false });
    }
}));



export const useAdminStore = create((set) => ({
    groups: undefined,

    // Function to set groups
    setGroups: (data) => set({ groups: data }),

    // Function to create a new group
    CreateGroup: async (GroupData) => {
        try {
            const res = await axios.post("http://localhost:8080/group", {

                group_name: GroupData.name,
                description: GroupData?.description,
                users: GroupData.members,
                created_by: authStore.getState().user._id,

            });

            // Update the groups state with the new group
            // set((state) => ({
            //     groups: state.groups ? [...state.groups, res.data.group] : [res.data.group],
            // }));

            return { success: true, data: res.data };
        } catch (error) {
            console.error("Error creating group:", error);
            return {
                success: false,
                message: error.response?.data?.error || "Failed to create group",
            };
        }
    },


    // Function to add users to a group
    addUsersToGroup: async (groupId, userIds) => {
        try {
            const response = await axios.put('http://localhost:8080/group', {
                groupId,
                userIds,
            });

            // If successful, update the state (optional)
            // set((state) => ({
            //     groups: state.groups.map((group) =>
            //         group._id === groupId
            //             ? { ...group, users: [...group.users, ...userIds] }
            //             : group
            //     ),
            // }));

            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error adding users to group:", error);
            return {
                success: false,
                message: error.response?.data?.error || "Failed to add users to group",
            };
        }
    },


    deleteGroup: async (groupId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/group/${groupId}`);

            // If successful, update the state by removing the deleted group
            // set((state) => ({
            //     groups: state.groups.filter((group) => group._id !== groupId),
            // }));

            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error deleting group:", error);
            return {
                success: false,
                message: error.response?.data?.error || "Failed to delete group",
            };
        }
    },


    addTaskToGroup: async (groupID, taskData) => {
        try {
            const payload = {
                task: {
                    task_title: taskData.taskName, // Ensure this matches the backend's expected field name
                    due_date: taskData.dueDate, // Ensure this matches the backend's expected field name
                    Priority: taskData.priority || 'Medium', // Ensure this matches the backend's expected field name
                    created_by: taskData.createdBy || '67b9a3afcfcab0e89cc9ae8e', // Ensure this matches the backend's expected field name
                }
            };

            console.log("Sending payload:", payload); // Log the payload for debugging

            const response = await axios.post(`http://localhost:8080/group/task/${groupID}`, payload);

            console.log("Response from server:", response.data); // Log the response for debugging

            return response.data;
        } catch (error) {
            console.error("Error adding task:", error);
            if (error.response) {
                console.error("Server response data:", error.response.data); // Log the server's error response
                console.error("Server response status:", error.response.status); // Log the status code
            }
            throw error;
        }
    }


}));



export const useStudentStore = create((set) => ({

    StudentGroups: undefined,

    getGroupsByIds: async (userID) => {

        try {
            // Make the API request
            const response = await axios.get(`http://localhost:8080/group/student/${userID}`);

            // Update the state with the fetched groups
            set({ StudentGroups: response.data.groups });
        } catch (error) {
            console.error("Error fetching user groups:", error);
            set({ error: error.response?.data?.error || "Failed to fetch user groups", loading: false });
        }
    },


}));


export const usePortfolioStore = create((set) => ({
    step: 1,
    formData: {
        Name: "",
        Email: "",
        ProfileImage: "",
        Socials: {},
        Location: "",
        Aboutme: "",
        Skills: [{ Skill: "", Rating: "" }],
        Education: [{ nameofInstitiute: "", course: "", year: "" }],
        Internships: [{ Company: "", Role: "", year: "", Description: "" }],
        Certificates: [],
        Projects: [{ Title: "", Github: "", Figma: "", Documentation: "", Description: "", Images: [] }]
    },

    // Function to update form data
    updateFormData: (field, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                [field]: value,
            },
        })),

    // Function to go to the next step
    nextStep: () => set((state) => ({ step: state.step + 1 })),

    // Function to go to the previous step
    prevStep: () => set((state) => ({ step: state.step - 1 })),

    // Reset form
    resetForm: () =>
        set({
            step: 1,
            formData: {
                Name: "",
                Email: "",
                ProfileImage: "",
                Socials: {},
                Location: "",
                Aboutme: "",
                Skills: [{ Skill: "", Rating: "" }],
                Education: [{ nameofInstitiute: "", course: "", year: "" }],
                Internships: [{ Company: "", Role: "", year: "", Description: "" }],
                Certificates: [],
                Projects: [{ Title: "", Github: "", Figma: "", Documentation: "", Description: "", Images: [] }]
            },
        }),


}));




