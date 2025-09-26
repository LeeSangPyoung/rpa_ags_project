import axios from "../config/axios.config"
import { ActionInstanceRequest, StepInstanceRequest, StepExecutionRequest} from "../types";

const HISTORY_URL = "/history"

export const HistoryApi = {
    getListActionInstances: async ({
        keyword,
        status,
        startTime,
        endTime,
        page,
        limit }: ActionInstanceRequest) => {
        const res = await axios.post(`${HISTORY_URL}/action-instance`, {
            keyword,
            status,
            startTime,
            endTime,
            page,
            limit
        });
        return res;
    },

    getListStepInstances: async ({
        keyword,
        rpaActionId,
        status,
        startTime,
        endTime,
        page,
        limit }: StepInstanceRequest) => {
        const res = await axios.post(`${HISTORY_URL}/step-instance`, {
            keyword,
            rpaActionId,
            status,
            startTime,
            endTime,
            page,
            limit
        });
        return res;
    },

    getListStepExecutions: async ({
        keyword,
        rpaActionId,
        rpaStepId,
        status,
        startTime,
        endTime,
        page,
        limit }: StepExecutionRequest) => {
        const res = await axios.post(`${HISTORY_URL}/step-execution`, {
            keyword,
            rpaActionId,
            rpaStepId,
            status,
            startTime,
            endTime,
            page,
            limit
        });
        return res;
    },

    getStepExecutionPopup: async (
        id : number | undefined) => {
        const res = await axios.get(`${HISTORY_URL}/execution-log?id=${id}`);
        return res;
    },
};


