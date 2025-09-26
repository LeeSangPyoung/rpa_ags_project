import { ApiResponse } from "./api";

export interface AccountState {
    totalItems: number,
    isLoading: boolean,
    isUpdateAccountSuccess: boolean 
}

export interface AccountActions {
    getAccountList: (data: AccountRequest) => Promise<ApiResponse<Account[]> | undefined>
    addAccountAction: (data: Account) => Promise<ApiResponse<null> | undefined>
    editAccountAction: (data: Account) => Promise<ApiResponse<null> | undefined>
    deleteAccountAction: (data: Account) => Promise<ApiResponse<null> | undefined>
}

export type Account = {
    accountGroupId: number,
    key: string,
    accountNo: number,
    accountKey: string,
    groupName?: string,
    value?: string,
    frstRegUserId?: string,
    frstRegDate?: string,
    chgRegUserId?: string,
    chgRegDate?: string
}

export type AccountRequest = {
    keyword?: string,
    accountGroupId?:number,
    accountNo?: number,
    accountKey?: string,
    value?:string
}
