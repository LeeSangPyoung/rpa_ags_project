
import { create } from 'zustand'
import { ApiResponse } from '../types/api'
import { StepParam, StepParamRequest, StepParamResponse, StepParamStoreActions, StepParamStoreState } from '../types'
import { parameterApi } from '../api/parameter.api'


type ParameterStoreType = StepParamStoreState & StepParamStoreActions

export const useParameterStore = create<ParameterStoreType>()(
    (set, get) => ({
        //initial states
        isLoading: false,

        // actions
        getStepParamByStepId: async (data: StepParamRequest): Promise<ApiResponse<StepParamResponse> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<StepParamResponse> = await parameterApi.getStepParamByStepId(data);
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },
        addStepParamAction: async (data: StepParam): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await parameterApi.addStepParam(data);
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },

        editStepParamAction: async (data: StepParam): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await parameterApi.updateStepParam(data);
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },

        deleteStepParamAction: async (id: number): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await parameterApi.deleteStepParam(id);
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },


    }),


)

