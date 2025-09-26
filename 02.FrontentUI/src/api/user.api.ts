import axios from "../config/axios.config"
import { CreateUserRequest, EditUserRequest, ResetPasswordRequest, UserManagementRequest } from "../types";

const ADMIN_URL = "/admin"
export const userApi = {
    getListUsers: async ({
        keyword,
        roleId,
        statusIdList,
        createdAt,
        approveDate,
        page,
        limit }: UserManagementRequest) => {
        const res = await axios.post(`${ADMIN_URL}/user-list`, {
            keyword,
            roleId,
            statusIdList,
            createdAt,
            approveDate,
            page,
            limit
        })
        return res;
    },
    approveUsers: async (userList: string[]) => {
        const res = await axios.post(`${ADMIN_URL}/approve`, { userList })
        return res;
    },

    createUser: async ({
        userId,
        password,
        userName,
        email,
        phoneNumber,
        statusId,
        mustChangePw,
        roleId }: CreateUserRequest) => {
        const res = await axios.post(`${ADMIN_URL}/create`, {
            userId,
            password,
            userName,
            email,
            phoneNumber,
            statusId,
            mustChangePw,
            roleId,
        })
        return res;
    },
    editUser: async (
        {
            userId,
            userName,
            email,
            phoneNumber,
            statusId,
            mustChangePw,
            roleId
        }: EditUserRequest) => {
        const res = await axios.post(`${ADMIN_URL}/update`, {
            userId,
            userName,
            email,
            phoneNumber,
            statusId,
            mustChangePw,
            roleId
        })
        return res;
    },
    unlockUsers: async (userList: string[]) => {
        const res = await axios.post(`${ADMIN_URL}/unlock`, { userList })
        return res;
    },

    deleteUsers: async (userList: string[]) => {
        const res = await axios.post(`${ADMIN_URL}/delete`, { userList })
        return res;
    },

    rejectUsers: async (userList: string[]) => {
        const res = await axios.post(`${ADMIN_URL}/reject`, { userList })
        return res;
    },

    resetPasswordUsers: async (userList: ResetPasswordRequest[]) => {
        const res = await axios.post(`${ADMIN_URL}/reset-password`, { userList })
        return res;
    }

};

