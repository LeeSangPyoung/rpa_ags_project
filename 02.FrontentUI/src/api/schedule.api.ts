import axios from "../config/axios.config"
import { ActionScheduleRequest, ActionList, AddScheduleRequest } from "../types";

const ACTION_URL = "/action"

export const scheduleApi = {
    getListSchedules: async ({
        keyword,
        name,
        status,
        startDateFrom,
        startDateTo,
        endDateFrom,
        endDateTo,
        frstRegUserId,
        repeatable,
        page,
        limit }: ActionScheduleRequest) => {
        const res = await axios.post(`${ACTION_URL}`, {
            keyword,
            name,
            status,
            startDateFrom,
            startDateTo,
            endDateFrom,
            endDateTo,
            frstRegUserId,
            repeatable,
            page,
            limit
        });
        return res;
    },

    addActionSchedule: async ({
        name,
        description,
        cronExpression,
        nextRunTime,
        status,
        repeatable,
        startDate,
        endDate,
        comments,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate }: AddScheduleRequest) => {
        const res = await axios.post(`${ACTION_URL}/insert`, {
            name,
            description,
            cronExpression,
            nextRunTime,
            status,
            repeatable,
            startDate,
            endDate,
            comments,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate
        });
        return res;
    },

    editSchedule: async ({
        id,
        name,
        description,
        cronExpression,
        nextRunTime,
        status,
        repeatable,
        startDate,
        endDate,
        comments,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate }: ActionList) => {
        const res = await axios.post(`${ACTION_URL}/update`, {
            id,
            name,
            description,
            cronExpression,
            nextRunTime,
            status,
            repeatable,
            startDate,
            endDate,
            comments,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate
        });
        return res;
    },
    
    deleteActionSchedule: async (idList: number[]) => {
        const res = await axios.post(`${ACTION_URL}/delete`, { idList: idList })
        return res;
    },

    manualExecute: async (actionId: number) => {
        const res = await axios.post(`${ACTION_URL}/manual-execute`, { actionId })
        return res;
    },

    getActionType: async () => {
        const res = await axios.get(`${ACTION_URL}/combobox`)
        return res;
    }, 
    getScheduleById: async (id: number) => {
        const res = await axios.get(`${ACTION_URL}`, {params: id});
        return res;
    },

};

