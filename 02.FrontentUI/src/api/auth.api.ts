import axios from "../config/axios.config"

export const authApi = {
    login: async (userId: string, password: string) => {
        const res = await axios.post(`/login`, { userId, password });
        return res;
    },
    register: async (userId: string, userName: string, password: string, email: string, phoneNumber: string, roleId: number) => {
        const res = await axios.post(`/register`, { userId, userName, password, email, phoneNumber, roleId });
        return res;
    },
    getRoles: async () => {
        const res = await axios.get("/role")
        return res;
    },
    changePassword: async (oldPassword: string, newPassword: string) => {
        const res = await axios.post(`/user/change-password`, { oldPassword, newPassword });
        return res;
    },

};

