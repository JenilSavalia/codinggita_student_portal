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




