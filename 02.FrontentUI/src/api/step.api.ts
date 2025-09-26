import axios from "../config/axios.config"
import { StepAction, StepRequest } from "../types";

const BASE_URL = "/step"

export const stepApi = {
    getListSteps: async ({
        rpaActionId,
        stepOrder,
        rpaType,
        scriptPath,
        scriptFile,
        accountGroupId,
        repeatPerAccount,
        targetFilePath,
        downloadPath,
        parallelExecution,
        description,
        name,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate,
        limit,
        page }: StepRequest) => {
        const res = await axios.post(`${BASE_URL}`, {
            rpaActionId,
            stepOrder,
            rpaType,
            scriptPath,
            scriptFile,
            accountGroupId,
            repeatPerAccount,
            targetFilePath,
            downloadPath,
            parallelExecution,
            description,
            name,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate,
            limit,
            page
        });
        return res;
    },

    addStep: async ({
        rpaActionId,
        stepOrder,
        rpaType,
        scriptPath,
        scriptFile,
        accountGroupId,
        repeatPerAccount,
        targetFilePath,
        downloadPath,
        parallelExecution,
        description,
        name,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate }: StepAction) => {
        const res = await axios.post(`${BASE_URL}/insert`, {
            rpaActionId,
            stepOrder,
            rpaType,
            scriptPath,
            scriptFile,
            accountGroupId,
            repeatPerAccount,
            targetFilePath,
            downloadPath,
            parallelExecution,
            description,
            name,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate,
        });
        return res;
    },

    editStep: async ({
        id,
        rpaActionId,
        stepOrder,
        rpaType,
        scriptPath,
        scriptFile,
        accountGroupId,
        repeatPerAccount,
        targetFilePath,
        downloadPath,
        parallelExecution,
        description,
        name,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate }: StepAction) => {
        const res = await axios.post(`${BASE_URL}/update`, {
            id,
            rpaActionId,
            stepOrder,
            rpaType,
            scriptPath,
            scriptFile,
            accountGroupId,
            repeatPerAccount,
            targetFilePath,
            downloadPath,
            parallelExecution,
            description,
            name,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate,
        });
        return res;
    },
    
    deleteStep: async (id: number) => {
        const res = axios.post(`${BASE_URL}/delete?id=${id}`)
        return res;
    },

    getStepType: async (rpaActionId : number | undefined) => {
        const res = await axios.get(`${BASE_URL}/combobox?rpaActionId=${rpaActionId}`)
        return res;
    },
};

