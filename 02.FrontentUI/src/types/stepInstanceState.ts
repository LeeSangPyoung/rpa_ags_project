import { ApiResponse } from "./api";

export interface StepInstanceStoreState {
    totalItems: number,
    isLoading: boolean,
    isUpdateStepInstanceSuccess: boolean 
}

export interface StepInstanceStoreActions {
    getListStepInstance: (data: StepInstanceRequest) => Promise<ApiResponse<StepInstanceResponse> | undefined>
}

export type StepInstanceResponse = {
    page?: StepInstance[]
    total: number,
}

export type StepInstance = {
    id: number,
    rpaStepId?: number,
    rpaStepName?: string,
    description?: string,
    rpaActionInstanceId?: number,
    rpaActionId?: number,
    rpaActionName?: string,
    status?: string,
    startTime?: string,
    endTime?: string,
    frstRegUserId?: string,
    frstRegDate?: string,
    chgRegUserId?: string,
    chgRegDate?: string
}

export type StepInstanceRequest = {
    keyword?: string,
    rpaActionId?: number,
    status?: string,
    startTime?: string,
    endTime?: string,
    page: number,
    limit: number,
}
