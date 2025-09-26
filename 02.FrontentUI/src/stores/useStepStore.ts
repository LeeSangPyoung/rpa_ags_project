import { create } from "zustand";
import { ApiResponse } from "../types/api";
import {
  StepAction,
  StepRequest,
  StepResponse,
  StepStoreActions,
  StepStoreState,
} from "../types";
import { stepApi } from "../api";
import { Options } from "../hooks/useCombobox";

type StepStoreType = StepStoreState & StepStoreActions;

export const useStepStore = create<StepStoreType>()((set, get) => ({
  //initial states
  isLoading: false,

  // actions
  getListSteps: async (
    data: StepRequest
  ): Promise<ApiResponse<StepResponse> | undefined> => {
    set({ isLoading: true });
    try {
      const res: ApiResponse<StepResponse> = await stepApi.getListSteps(data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addStepAction: async (
    data: StepAction
  ): Promise<ApiResponse<null> | undefined> => {
    set({ isLoading: true });
    try {
      const res: ApiResponse<null> = await stepApi.addStep(data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  editStepAction: async (
    data: StepAction
  ): Promise<ApiResponse<null> | undefined> => {
    set({ isLoading: true });
    try {
      const res: ApiResponse<null> = await stepApi.editStep(data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteStepAction: async (
    stepId: number
  ): Promise<ApiResponse<null> | undefined> => {
    set({ isLoading: true });
    try {
      const res: ApiResponse<null> = await stepApi.deleteStep(stepId);
      return res;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },
  getStepTypeAction: async (
    rpaActionId: number | undefined
  ): Promise<ApiResponse<Options[]> | undefined> => {
    set({ isLoading: true });
    try {
      const res: ApiResponse<Options[]> = await stepApi.getStepType(
        rpaActionId
      );
      return res;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
