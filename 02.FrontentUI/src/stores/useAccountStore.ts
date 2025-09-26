import { create } from "zustand";
import { ApiResponse } from "../types/api";
import { accountApi } from "../api";
import { AccountRequest, Account, AccountActions, AccountState } from "../types/accountState";

type AccountStoreType = AccountState & AccountActions

export const useAccountStore = create<AccountStoreType>()(
  (set, get) => ({
    //initial states
    totalItems: 0,
    isLoading: false,
    isUpdateAccountSuccess: false,
    
    // actions
    getAccountList: async (data: AccountRequest) : Promise<ApiResponse<Account[]> | undefined> => {
      set({ isLoading: true });
      try {
        const res: ApiResponse<Account[]> = await accountApi.getAccountList(data);
        return res;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        set({ isLoading: false });
      }
    },

    addAccountAction: async (data: Account) : Promise<ApiResponse<null> | undefined>=> {
      set({ isLoading: true });
      try {
        const res: ApiResponse<null> = await accountApi.addAccount(data);
        return res;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        set({ isLoading: false });
      }
    },

    editAccountAction: async (data: Account) : Promise<ApiResponse<null> | undefined>=> {
      set({ isLoading: true });
      try {
        const res: ApiResponse<null> = await accountApi.editAccount(data);
        return res;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        set({ isLoading: false });
      }
    },
    
    deleteAccountAction: async (data: Account) : Promise<ApiResponse<null> | undefined>=> {
      set({ isLoading: true });
      try {
        const res: ApiResponse<null> = await accountApi.deleteAccount(data);
        return res;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        set({ isLoading: false });
      }
    },
  })
);
