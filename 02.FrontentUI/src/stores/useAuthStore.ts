
import { create } from 'zustand'
import { AuthStoreActions, AuthStoreState, ChangePasswordRequestType, ChangePasswordResponseType, LoginRequestType, LoginResponseType, RegisterRequestType } from '../types'
import { authApi } from '../api'
import { persist } from 'zustand/middleware'
import { ApiResponse } from '../types/api'
import { navigate } from '../utils/navigation'
import { LOGIN_ROUTE } from '../constants/constants'

type AuthStoreType = AuthStoreState & AuthStoreActions

export const useAuthStore = create<AuthStoreType>()(
    persist(
        (set, get) => ({
            //initial states
            jwtToken: "",
            userId: "",
            roles: [],
            isLoading: false,
            isRegisterSuccess: false,
            mustChangePw: 0,
            isChangePwSuccess: false,

            // actions
            resetData: () => {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("auth-storage");
                set({ userId: "", roles: [] });
            },

            login: async ({ userId, password }: LoginRequestType): Promise<ApiResponse<LoginResponseType> | undefined> => {
                set({ isLoading: true })
                try {
                    const res: ApiResponse<LoginResponseType> = await authApi.login(userId, password);

                    if (res.data) {
                        localStorage.setItem("jwtToken", res.data?.jwtToken);
                        set({
                            userId: res.data?.userId,
                            roles: res.data?.roles,
                            mustChangePw: res?.data?.mustChangePw,
                        })
                    }

                    return res

                } catch (error) {
                    return Promise.reject(error)

                } finally {
                    set({ isLoading: false })
                }
            },

            logout: () => {
                get().resetData()
                navigate(LOGIN_ROUTE)
            },

            register: async ({ userId, userName, password, email, phoneNumber, roleId }: RegisterRequestType): Promise<ApiResponse<null> | undefined> => {
                set({ isLoading: true })
                try {
                    const res: ApiResponse<null> = await authApi.register(userId, userName, password, email, phoneNumber, roleId);
                    return res

                } catch (error) {
                    return Promise.reject(error)

                } finally {
                    set({ isLoading: false })
                }
            },

            changePassword: async ({ oldPassword, newPassword }: ChangePasswordRequestType): Promise<ApiResponse<ChangePasswordResponseType> | undefined> => {
                set({ isLoading: true })
                try {
                    const res: ApiResponse<LoginResponseType> = await authApi.changePassword(oldPassword, newPassword);
                    return res

                } catch (error) {
                    return Promise.reject(error)
                } finally {
                    set({ isLoading: false })
                }
            },

            setIsRegisterSuccess: (isSuccess: boolean) => {
                set({ isRegisterSuccess: isSuccess })
            },

            setMustChangePw: (value: number) => {
                set({ mustChangePw: value })
            },

            setIsChangePwSuccess: (isChangePwSuccess: boolean) => {
                set({ isChangePwSuccess: isChangePwSuccess })
            }

        }),

        //storage config
        {
            name: "auth-storage",
            partialize: (state) => ({
                userId: state.userId,
                roles: state.roles,
            })
        }
    )
)

