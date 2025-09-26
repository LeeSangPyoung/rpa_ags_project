import { ApiResponse } from "./api";

export interface ActionInstanceStoreState {
    totalItems: number,
    isLoading: boolean,
    isUpdateActionInstanceSuccess: boolean 
}

export interface ActionInstanceStoreActions {
    getListActionInstance: (data: ActionInstanceRequest) => Promise<ApiResponse<ActionInstanceResponse> | undefined>
}

export type ActionInstanceResponse = {
    page?: ActionInstance[]
    total: number,
}

export type ActionInstance = {
    id: number,
    rpaActionId?: number,
    rpaActionName?: string,
    description?: string,
    status?: string,
    startTime?: string,
    endTime?: string,
    triggeredBy?: string,
    frstRegUserId?: string,
    frstRegDate?: string,
    chgRegUserId?: string,
    chgRegDate?: string
}

export type ActionInstanceRequest = Pick<ActionInstance, 'rpaActionName'| 'triggeredBy'| 'frstRegUserId'> & {
    keyword?: string,
    status?: string,
    startTime?: string,
    endTime?: string,
    page: number,
    limit: number,
}
