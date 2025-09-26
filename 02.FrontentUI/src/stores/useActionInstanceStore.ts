
import { create } from 'zustand'
import { ApiResponse } from '../types/api'
import { ActionInstanceStoreState, ActionInstanceStoreActions, ActionInstanceRequest, ActionInstanceResponse } from '../types'
import { HistoryApi } from '../api'

type ActionInstanceStoreType = ActionInstanceStoreState & ActionInstanceStoreActions

export const useActionInstanceStore = create<ActionInstanceStoreType>()(
    (set, get) => ({
        //initial states
        totalItems: 0,
        isLoading: false,
        isUpdateActionInstanceSuccess: false,

        // actions
        getListActionInstance: async (data: ActionInstanceRequest): Promise<ApiResponse<ActionInstanceResponse> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<ActionInstanceResponse> = await HistoryApi.getListActionInstances(data);
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

