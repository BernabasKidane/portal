// src/store/userStore.js
import { create } from "zustand";

const loadCurrentUser = () => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");
    const status = localStorage.getItem("userStatus");
    const username = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId"); // Retrieve user ID

    return token ? { username, role, status, token, _id: userId } : null; // Include user ID
};

export const useUserStore = create((set) => ({
    users: [],
    loading: false,
    error: null,
    currentUser: loadCurrentUser(), // Load current user from local storage

    setUsers: (users) => set({ users }),

    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
            const res = await fetch("http://localhost:5000/api/users");
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            set({ users: data.data });
        } catch (error) {
            console.error("Failed to fetch users:", error);
            set({ error: "Failed to load users. Please try again later." });
        } finally {
            set({ loading: false });
        }
    },

    // Function to set the current user
    setCurrentUser: (user) => {
        set({ currentUser: user });
        if (user) {
            localStorage.setItem("userToken", user.token);
            localStorage.setItem("userRole", user.role);
            localStorage.setItem("userName", user.username);
            localStorage.setItem("userStatus", user.status);
            localStorage.setItem("userId", user._id); // Store user ID
        } else {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userRole");
            localStorage.removeItem("userName");
            localStorage.removeItem("userStatus");
            localStorage.removeItem("userId"); // Remove user ID
        }
    },

    // Function to clear the current user
    clearUser: () => {
        set({ currentUser: null }); // Clear user state
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
        localStorage.removeItem("userStatus");
        localStorage.removeItem("userId"); // Remove user ID
    },

    deleteUser: async (uid) => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${uid}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!data.success) {
                return { success: false, message: data.message };
            }

            // Optimistically remove the user from the local state
            set((state) => ({
                users: state.users.filter(user => user._id !== uid),
            }));
            return { success: true, message: "User deleted successfully!" };
        } catch (error) {
            console.error("Error deleting user:", error);
            return { success: false, message: "Failed to delete user. Please try again later." };
        }
    },

    updateUser: async (uid, updatedUser) => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${uid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });

            const data = await res.json();
            if (!data.success) return { success: false, message: data.message };

            set((state) => ({
                users: state.users.map((user) => (user._id === uid ? data.data : user)),
            }));
            return { success: true, message: "User updated successfully!" };
        } catch (error) {
            console.error("Error updating user:", error);
            return { success: false, message: "Failed to update user. Please try again later." };
        }
    },
}));