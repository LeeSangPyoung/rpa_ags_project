import { ApiResponse } from "./api"

export type UserList = {
    id?: number,
    userId?: string,
    userName?: string,
    email?: string,
    phoneNumber?: string,
    statusId?: number,
    status?: "ACTIVE" | "SUBMITTED" | "LOCKED" | "REJECTED",
    mustChangePw?: number,
    roleId?: number,
    roleName?: string,
    lockCount?: number,
    createdAt?: string,
    updatedAt?: string,
}

export interface UserStoreState {
    isFirstTimeRender: boolean,
    totalItems: number,
    isLoading: boolean
}

export interface UserStoreActions {
    getListUsers: (data: UserManagementRequest) => Promise<ApiResponse<UserManagementResponse> | undefined>,
    approveUsersAction: (userList: string[]) => Promise<ApiResponse<null> | undefined>
    unlockUsersAction: (userList: string[]) => Promise<ApiResponse<null> | undefined>
    editUserAction: (data: EditUserRequest) => Promise<ApiResponse<null> | undefined>,
    createUserAction: (data: CreateUserRequest) => Promise<ApiResponse<null> | undefined>
    deleteUsersAction: (userList: string[]) => Promise<ApiResponse<null> | undefined>
    rejectUsersAction: (userList: string[]) => Promise<ApiResponse<null> | undefined>
    resetPasswordUsersAction: (userList: ResetPasswordRequest[]) => Promise<ApiResponse<null> | undefined>
}

export type UserManagementResponse = {
    page?: UserList[]
    total: number,
}

export type UserManagementRequest = Pick<UserList, 'roleId' | 'status' | 'createdAt' > & {
    keyword?: string,
    statusIdList?: number[]
    approveDate?: string,
    page: number,
    limit: number,
}

export type EditUserRequest = {
    userId?: string,
    password?: string,
    userName?: string,
    email?: string,
    phoneNumber?: string,
    statusId?: number,
    mustChangePw?: number,
    roleId?: number
}
export type CreateUserRequest = {
    userId: string,
    password: string,
    userName?: string,
    email: string,
    phoneNumber: string,
    statusId?: number,
    mustChangePw?: number,
    roleId: number
}

export type ResetPasswordRequest = {
    userId: string,
    password: string,
}

