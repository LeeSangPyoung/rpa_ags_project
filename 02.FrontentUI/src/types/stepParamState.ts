import { ApiResponse } from "./api"

export type StepParam = {
    id?: number,
    stepId?: number,
    stepName?: string,
    paramKey?: string,
    paramValueTemplate?: string,
    isDynamic?: boolean,
    frstRegUserId?: string,
    frstRegDate?: string,
    chgRegUserId?: string,
    chgRegDate?: string,
}

export type StepParamRequest = StepParam & {
    limit: number,
    page: number
}

export type StepParamResponse = {
    page?: StepParam[]
    total?: number
}

export interface StepParamStoreState {
    isLoading: boolean,
}

export interface StepParamStoreActions {
    getStepParamByStepId: (data: StepParamRequest) => Promise<ApiResponse<StepParamResponse> | undefined>
    addStepParamAction: (data: StepParam) => Promise<ApiResponse<null> | undefined>
    editStepParamAction: (data: StepParam) => Promise<ApiResponse<null> | undefined>
    deleteStepParamAction: (id: number) => Promise<ApiResponse<null> | undefined>

}