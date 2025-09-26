import { create } from "zustand";
import { ApiResponse } from "../types/api";
import { accountGroupApi } from "../api";
import { Options } from "../hooks/useCombobox";
import { AccountGroupRequest, AccountGroup, AccountGroupActions, AccountGroupState } from "../types/accountGroupState";

type AccountGroupStoreType = AccountGroupState & AccountGroupActions

export const useAccountGroupStore = create<AccountGroupStoreType>()(
  (set, get) => ({
    //initial states
    totalItems: 0,
    isLoading: false,
    isUpdateAccountGroupSuccess: false,
    
    // actions
    getAccountGroupList: async (data: AccountGroupRequest) : Promise<ApiResponse<AccountGroup[]> | undefined> => {
      set({ isLoading: true });
      try {
        const res: ApiResponse<AccountGroup[]> = await accountGroupApi.getAccountGroupList(data);
        return res;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        set({ isLoading: false });
      }
    },

    addAccountGroupAction: async (data: AccountGroup) : Promise<ApiResponse<null> | undefined>=> {
      set({ isLoading: true });
      try {
        const res: ApiResponse<null> = await accountGroupApi.addAccountGroup(data);
        return res;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        set({ isLoading: false });
      }
    },

    editAccountGroupAction: async (data: AccountGroup) : Promise<ApiResponse<null> | undefined>=> {
      set({ isLoading: true });
      try {
        const res: ApiResponse<null> = await accountGroupApi.editAccountGroup(data);
        return res;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        set({ isLoading: false });
      }
    },
    
    deleteAccountGroupAction: async (id: number | undefined) : Promise<ApiResponse<null> | undefined>=> {
      set({ isLoading: true });
      try {
        const res: ApiResponse<null> = await accountGroupApi.deleteAccountGroup(id);
        return res;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        set({ isLoading: false });
      }
    },

    getAccountGroupTypeAction: async () : Promise<ApiResponse<Options[]> | undefined> => {
      set({ isLoading: true });
      try {
        const res: ApiResponse<Options[]> = await accountGroupApi.getAccountGroupType();
        return res;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        set({ isLoading: false });
      }
    },
  })
);
