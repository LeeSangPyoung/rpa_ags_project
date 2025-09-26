import axios from "../config/axios.config"
import { AccountRequest, Account } from "../types";

const ACCOUNT_URL = "/account"

export const accountApi = {
    getAccountList: async ({
        keyword,
        accountGroupId,
        accountNo,
        accountKey,
        value }: AccountRequest) => {
        const res = await axios.post(`${ACCOUNT_URL}`, {
             keyword,
            accountGroupId,
            accountNo,
            accountKey,
            value
        });
        return res;
    },

    addAccount: async ({
        accountGroupId,
        accountNo,
        accountKey,
        value,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate }: Account) => {
        const res = await axios.post(`${ACCOUNT_URL}/insert`, {
            accountGroupId,
            accountNo,
            accountKey,
            value,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate
        });
        return res;
    },

    editAccount: async ({
        accountGroupId,
        accountNo,
        accountKey,
        value,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate }: Account) => {
        const res = await axios.post(`${ACCOUNT_URL}/update`, {
            accountGroupId,
            accountNo,
            accountKey,
            value,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate
        });
        return res;
    },
    
    deleteAccount: async ({
        accountGroupId,
        accountNo,
        accountKey,} : Account) => {
        const res = axios.post(`${ACCOUNT_URL}/delete`, {
            accountGroupId,
            accountNo,
            accountKey,
        })
        return res;
    },
};

