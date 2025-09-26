import { StepParam } from './../types/stepParamState';
import axios from "../config/axios.config"
import { StepParamRequest } from "../types";

const BASE_URL = "/step-param-in-template"

export const parameterApi = {
    getStepParamByStepId: async ({
        id,
        stepId,
        stepName,
        paramKey,
        paramValueTemplate,
        isDynamic,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate,
        limit,
        page }: StepParamRequest) => {
        const res = await axios.post(`${BASE_URL}`, {
            id,
            stepId,
            stepName,
            paramKey,
            paramValueTemplate,
            isDynamic,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate,
            limit,
            page
        });
        return res;
    },

    addStepParam: async ({
        stepId,
        stepName,
        paramKey,
        paramValueTemplate,
        isDynamic,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate
    }: StepParam) => {
        const res = await axios.post(`${BASE_URL}/insert`, {
            stepId,
            stepName,
            paramKey,
            paramValueTemplate,
            isDynamic,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate,

        });
        return res;
    },

    updateStepParam: async ({
        stepId,
        stepName,
        paramKey,
        paramValueTemplate,
        isDynamic,
        frstRegUserId,
        frstRegDate,
        chgRegUserId,
        chgRegDate
    }: StepParam) => {
        const res = await axios.post(`${BASE_URL}/update`, {
            stepId,
            stepName,
            paramKey,
            paramValueTemplate,
            isDynamic,
            frstRegUserId,
            frstRegDate,
            chgRegUserId,
            chgRegDate,

        });
        return res;
    },

    deleteStepParam: async (id: number) => {
        const res = await axios.post(`${BASE_URL}/delete?id=${id}`)
        return res;
    },

    comboboxStepParam: async () => {
        const res = await axios.get(`${BASE_URL}/combobox`)
        return res;
    }

};

