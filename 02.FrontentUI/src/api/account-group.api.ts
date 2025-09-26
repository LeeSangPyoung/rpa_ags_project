import axios from "../config/axios.config"
import { AccountGroupRequest, AccountGroup } from "../types";

const ACCOUNT_GROUP_URL = "/account-group"

export const accountGroupApi = {
    getAccountGroupList: async ({
        keyword,
        groupName, }: AccountGroupRequest) => {
        const res = await axios.post(`${ACCOUNT_GROUP_URL}`, {
             keyword,
            groupName,
        });
        return res;
    },

    addAccountGroup: async ({
        groupName,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate }: AccountGroup) => {
        const res = await axios.post(`${ACCOUNT_GROUP_URL}/insert`, {
            groupName,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate 
        });
        return res;
    },

    editAccountGroup: async ({
        id,
        groupName,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate }: AccountGroup) => {
        const res = await axios.post(`${ACCOUNT_GROUP_URL}/update`, {
            id,
            groupName,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate 
        });
        return res;
    },
    
    deleteAccountGroup: async (id: number | undefined) => {
        const res = axios.post(`${ACCOUNT_GROUP_URL}/delete?id=${id}`)
        return res;
    },

    getAccountGroupType: async () => {
        const res = await axios.get(`${ACCOUNT_GROUP_URL}/combobox}`)
        return res;
    },
};

