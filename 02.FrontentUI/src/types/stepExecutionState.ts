import { ApiResponse } from "./api";

export interface StepExecutionStoreState {
    totalItems: number,
    isLoading: boolean,
    isUpdateStepExecutionSuccess: boolean 
}

export interface StepExecutionStoreActions {
    getListStepExecution: (data: StepExecutionRequest) => Promise<ApiResponse<StepExecutionResponse> | undefined>
    getStepExecutionPopup: (data: number | undefined) => Promise<ApiResponse<StepExecutionPopupResponse> | undefined>
}

export type StepExecutionResponse = {
    page?: StepExecution[]
    total: number,
}

export type StepExecution = {
    id: number,
    rpaStepInstanceId?: number,
    rpaStepId?: number,
    rpaStepName?: string,
    rpaActionId?: number,
    rpaActionName?: string,
    description?: string,
    accountId?: number,
    status?: string,
    startTime?: string,
    endTime?: string,
    executionGroupId?:string,
    resultLog?: string,
    frstRegUserId?: string,
    frstRegDate?: string,
    chgRegUserId?: string,
    chgRegDate?: string
}

export type StepExecutionRequest = {
    keyword?: string,
    rpaActionId?: number,
    rpaStepId?: number,
    status?: string,
    startTime?: string,
    endTime?: string,
    page: number,
    limit: number,
}

export type StepExecutionParamIn = {
    stepExecutionId?: number,
    no?: number,
    paramKey?: string,
    paramValue?: string,
    isDynamic?: boolean,
    paramValueDefault: string,
    frstRegUserId?: string,
    frstRegDate?: string,
    chgRegUserId?: string,
    chgRegDate?: string
}

export type StepExecutionParamOut = {
    id?: number,
    stepExecutionId?: number,
    paramKey?: string,
    paramValue?: string,
    frstRegUserId?: string,
    frstRegDate?: string,
    chgRegUserId?: string,
    chgRegDate?: string
}

export type StepExecutionPopupResponse = {
    resultLog?: string,
    rpaStepParamInDtoList ?: StepExecutionParamIn[],
    rpaStepParamOutDtoList ?: StepExecutionParamOut[],
}
