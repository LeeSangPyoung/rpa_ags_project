
import { create } from 'zustand'
import { ApiResponse } from '../types/api'
import { ActionCombobox, ActionList, ActionScheduleRequest, ActionScheduleResponse, AddScheduleRequest, ScheduleStoreActions, ScheduleStoreState } from '../types'
import { scheduleApi } from '../api'

type ScheduleStoreType = ScheduleStoreState & ScheduleStoreActions

export const useScheduleStore = create<ScheduleStoreType>()(
    (set, get) => ({
        //initial states
        totalItems: 0,
        isLoading: false,
        isUpdateScheduleSuccess: false,

        // actions
        getListSchedules: async (data: ActionScheduleRequest): Promise<ApiResponse<ActionScheduleResponse> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<ActionScheduleResponse> = await scheduleApi.getListSchedules(data);
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
        addScheduleAction: async (data: AddScheduleRequest): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await scheduleApi.addActionSchedule(data);
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },

        modifyScheduleAction: async (data: ActionList): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await scheduleApi.editSchedule(data);
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },
        deleteScheduleAction: async (idList: number[]): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await scheduleApi.deleteActionSchedule(idList);

                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },
        manualExecuteAction: async (actionId: number): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await scheduleApi.manualExecute(actionId);

                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },
        getActionTypeAction: async (): Promise<ApiResponse<ActionCombobox[]> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<ActionCombobox[]> = await scheduleApi.getActionType();
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },

        getScheduleById: async (actionId: number): Promise<ApiResponse<ActionList> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<ActionList> = await scheduleApi.getScheduleById(actionId);

                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },
        
        setIsUpdateScheduleSuccess: (updateScheduleSuccess: boolean) => {
            set({isUpdateScheduleSuccess: updateScheduleSuccess})
        }
    }),

)

