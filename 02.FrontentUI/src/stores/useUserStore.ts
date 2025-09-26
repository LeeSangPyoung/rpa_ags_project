
import { create } from 'zustand'
import { userApi } from '../api'
import { ApiResponse } from '../types/api'
import { CreateUserRequest, EditUserRequest, ResetPasswordRequest, UserManagementRequest, UserManagementResponse, UserStoreActions, UserStoreState } from '../types'

type UserStoreType = UserStoreState & UserStoreActions

export const useUserStore = create<UserStoreType>()(

    (set, get) => ({
        //initial states
        isFirstTimeRender: true,
        isLoading: false,
        totalItems: 0,

        // actions
        getListUsers: async (data: UserManagementRequest): Promise<ApiResponse<UserManagementResponse> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<UserManagementResponse> = await userApi.getListUsers(data);
                if (res?.data && get().isFirstTimeRender) {
                    set({ totalItems: res?.data?.total })
                    set({ isFirstTimeRender: false })
                }
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false})
            }
        },

        approveUsersAction: async (userList: string[]): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await userApi.approveUsers(userList);
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },

        createUserAction: async (data: CreateUserRequest): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await userApi.createUser(data);

                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },

        editUserAction: async (data: EditUserRequest): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await userApi.editUser(data);
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },

        unlockUsersAction: async (userList: string[]): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await userApi.unlockUsers(userList);
                return res

            } catch (error) {
                return Promise.reject(error);

            } finally {
                set({ isLoading: false })
            }
        },

        deleteUsersAction: async (userList: string[]): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await userApi.deleteUsers(userList);
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },
        rejectUsersAction: async (userList: string[]): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await userApi.rejectUsers(userList);
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },
        resetPasswordUsersAction: async (userList: ResetPasswordRequest[]): Promise<ApiResponse<null> | undefined> => {
            set({ isLoading: true })
            try {
                const res: ApiResponse<null> = await userApi.resetPasswordUsers(userList);
                return res

            } catch (error) {
                return Promise.reject(error)

            } finally {
                set({ isLoading: false })
            }
        },

    }),
)

