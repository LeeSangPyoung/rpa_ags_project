import { ApiResponse } from "./api";
import { Options } from "../hooks/useCombobox";

export interface StepStoreState {
    isLoading: boolean,
}

export interface StepStoreActions {
    getListSteps: (data: StepRequest) => Promise<ApiResponse<StepResponse> | undefined>
    addStepAction: (data: StepAction) => Promise<ApiResponse<null> | undefined>
    editStepAction: (data: StepAction) => Promise<ApiResponse<null> | undefined>
    deleteStepAction: (stepId: number) => Promise<ApiResponse<null> | undefined>
    getStepTypeAction: (rpaActionId : number | undefined) => Promise<ApiResponse<Options[]> | undefined>
}

export type Step = {
    id: number,
    rpaActionId: number,
    rpaActionName: string,
    stepOrder: number,
    rpaType: string,
    scriptPath: string,
    scriptFile: string,
    accountGroupId: number,
    accountGroupName: string,
    repeatPerAccount: boolean,
    targetFilePath: string,
    downloadPath: string,
    parallelExecution: boolean,
    description: string,
    name: string,
    frstRegUserId: string,
    frstRegDate: string,
    chgRegUserId: string,
    chgRegDate: string,
}

export type StepRequest = {
  rpaActionId?: number,
  stepOrder?: number,
  rpaType?: string,
  scriptPath?: string,
  scriptFile?: string,
  accountGroupId?: string,
  repeatPerAccount?: boolean,
  targetFilePath?: string,
  downloadPath?: string,
  parallelExecution?: boolean,
  description?: string,
  name?: string,
  frstRegUserId?: string,
  frstRegDate?: string,
  chgRegUserId?: string,
  chgRegDate?: string,
  limit: number,
  page: number
}

export type StepResponse = {
    page?: Step[]
    total: number,
}

export type StepAction = Partial<Step>