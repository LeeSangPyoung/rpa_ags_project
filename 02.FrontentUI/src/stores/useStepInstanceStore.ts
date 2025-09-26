
import { create } from 'zustand'
import { ApiResponse } from '../types/api'
import { StepInstanceStoreState, StepInstanceStoreActions, StepInstanceRequest, StepInstanceResponse } from '../types'
import { HistoryApi } from '../api'

type StepInstanceStoreType = StepInstanceStoreState & StepInstanceStoreActions

export const useStepInstanceStore = create<StepInstanceStoreType>()(
    (set, get) => ({
        //initial states
        totalItems: 0,
        isLoading: false,
        isUpdateStepInstanceSuccess: false,

        // Steps
        getListStepInstance: async (data: StepInstanceRequest): Promise<ApiResponse<StepInstanceResponse> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<StepInstanceResponse> = await HistoryApi.getListStepInstances(data);
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
    }),

)

