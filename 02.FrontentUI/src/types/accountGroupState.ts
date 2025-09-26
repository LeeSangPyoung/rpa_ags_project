import { ApiResponse } from "./api";
import { Options } from "../hooks/useCombobox";

export interface AccountGroupState {
    totalItems: number,
    isLoading: boolean,
    isUpdateAccountGroupSuccess: boolean 
}

export interface AccountGroupActions {
    getAccountGroupList: (data: AccountGroupRequest) => Promise<ApiResponse<AccountGroup[]> | undefined>
    addAccountGroupAction: (data: AccountGroup) => Promise<ApiResponse<null> | undefined>
    editAccountGroupAction: (data: AccountGroup) => Promise<ApiResponse<null> | undefined>
    deleteAccountGroupAction: (id: number | undefined) => Promise<ApiResponse<null> | undefined>
    getAccountGroupTypeAction: () => Promise<ApiResponse<Options[]> | undefined>
}

export type AccountGroup = {
    id: number,
    groupName?: string,
    accountTotal:number,
    frstRegUserId?: string,
    frstRegDate?: string,
    chgRegUserId?: string,
    chgRegDate?: string
}

export type AccountGroupRequest = {
    keyword?: string,
    groupName?: string
}
