import { ApiResponse } from "./api";

export interface ScheduleStoreState {
    totalItems: number,
    isLoading: boolean,
    isUpdateScheduleSuccess: boolean 
}

export interface ScheduleStoreActions {
    getListSchedules: (data: ActionScheduleRequest) => Promise<ApiResponse<ActionScheduleResponse> | undefined>
    addScheduleAction: (data: AddScheduleRequest) => Promise<ApiResponse<null> | undefined>
    modifyScheduleAction: (data: ActionList) => Promise<ApiResponse<null> | undefined>
    deleteScheduleAction: (idList: number[]) => Promise<ApiResponse<null> | undefined>
    manualExecuteAction: (actionId: number) => Promise<ApiResponse<null> | undefined>
    getScheduleById: (actionId: number) => Promise<ApiResponse<ActionList> | undefined>
    getActionTypeAction: () => Promise<ApiResponse<ActionCombobox[]> | undefined>
    setIsUpdateScheduleSuccess: (updateScheduleSuccess: boolean) => void
}

export type ActionScheduleResponse = {
    page?: ActionList[]
    total: number,
}

export type ActionList = {
    id: number,
    name?: string,
    description?: string,
    cronExpression?: string,
    nextRunTime?: string,
    status?: string,
    repeatable?: boolean,
    startDate?: string,
    endDate?: string,
    comments?: string,
    frstRegUserId?: string,
    frstRegDate?: string,
    chgRegUserId?: string,
    chgRegDate?: string
}

export type ActionScheduleRequest = Pick<ActionList, 'name' | 'status' | 'frstRegUserId' | 'repeatable'> & {
    keyword?: string,
    startDateFrom?: string,
    startDateTo?: string,
    endDateFrom?: string,
    endDateTo?: string,
    page: number,
    limit: number,

}

export type AddScheduleRequest = Omit<ActionList, 'id'> 

export type ActionCombobox = {
    id: number,
    value: string
} 

export type WebSocketUpdate = Pick<ActionList, "id" | "status" | "startDate" |"endDate"> 
