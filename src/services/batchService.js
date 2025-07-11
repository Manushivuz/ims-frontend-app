export const batchService = {
    fetchBatchData: async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/api/batch/get-summary`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.json();
    },

    fetchBatchIds: async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/api/batch/get-ids`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.json();
    },

    fetchBatchProgress: async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const response = await fetch(`${baseUrl}/batches/progress`);
        return response.json();
    },

    fetchAvailableUsers: async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const response = await fetch(`${baseUrl}/allusers`);
        return response.json();
    },

    deleteBatch: async (batchId) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        return fetch(`${baseUrl}/batches/${batchId}`, {
            method: "DELETE"
        });
    },

    getBatchById: async (batchId) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem("token");
        return fetch(`${baseUrl}/batches/${batchId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },

    createBatch: async (batchData) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        return fetch(`${baseUrl}/batches`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(batchData)
        });
    },

    updateBatch: async (batchId, batchData) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        return fetch(`${baseUrl}/batches/${batchId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(batchData)
        });
    },

    // TEAM MANAGEMENT
    createTeam: async (batchId, { name, members }) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/api/batch/${batchId}/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, members })
        });
        return response.json();
    },

    updateTeam: async (batchId, teamId, { name }) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/api/batch/${batchId}/teams/${teamId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });
        return response.json();
    },

    deleteTeam: async (batchId, teamId) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/api/batch/${batchId}/teams/${teamId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.json();
    },

    addMembersToTeam: async (batchId, teamId, members) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/api/batch/${batchId}/teams/${teamId}/members`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ members })
        });
        return response.json();
    },

    removeMemberFromTeam: async (batchId, teamId, memberId) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/api/batch/${batchId}/teams/${teamId}/members/${memberId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.json();
    },

    moveMemberBetweenTeams: async (batchId, fromTeamId, toTeamId, memberId) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/api/batch/${batchId}/teams/move-member`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ batchId, fromTeamId, toTeamId, memberId })
        });
        return response.json();
    },

    fetchTeamsForBatch: async (batchId) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/api/batch/${batchId}/teams`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.json();
    }
};