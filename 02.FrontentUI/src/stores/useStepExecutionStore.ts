
import { create } from 'zustand'
import { ApiResponse } from '../types/api'
import { StepExecutionStoreState, StepExecutionStoreActions, StepExecutionRequest, StepExecutionResponse, StepExecutionPopupResponse } from '../types'
import { HistoryApi } from '../api'

type StepExecutionStoreType = StepExecutionStoreState & StepExecutionStoreActions

export const useStepExecutionStore = create<StepExecutionStoreType>()(
    (set, get) => ({
        //initial states
        totalItems: 0,
        isLoading: false,
        isUpdateStepExecutionSuccess: false,

        // Steps
        getListStepExecution: async (data: StepExecutionRequest): Promise<ApiResponse<StepExecutionResponse> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<StepExecutionResponse> = await HistoryApi.getListStepExecutions(data);
                set({
                    totalItems: res.data?.total
                })
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },

        getStepExecutionPopup: async (id : number | undefined): Promise<ApiResponse<StepExecutionPopupResponse> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<StepExecutionPopupResponse> = await HistoryApi.getStepExecutionPopup(id);
                return res
            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },
    }),

)

