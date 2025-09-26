import { ApiResponse } from "./api";

export interface AuthStoreState {
  jwtToken: string,
  userId: string,
  roles: string[],
  isLoading: boolean,
  isRegisterSuccess: boolean,
  mustChangePw: number,
  isChangePwSuccess: boolean,
}

export interface AuthStoreActions {
  login: ({ userId, password }: LoginRequestType) => Promise<ApiResponse<LoginResponseType> | undefined>
  logout: () => void
  register: ({ userId, userName, password, email, phoneNumber, roleId }: RegisterRequestType) => Promise<ApiResponse<null> | undefined>
  changePassword: ({ oldPassword, newPassword }: ChangePasswordRequestType) => Promise<ApiResponse<ChangePasswordResponseType> | undefined>
  setIsRegisterSuccess: (isRegisterSuccess: boolean) => void
  setIsChangePwSuccess: (isChangePwSuccess: boolean) => void
  setMustChangePw: (mustChangePw: number) => void
  resetData: () => void
}

export type LoginRequestType = {
  userId: string;
  password: string;
  remember?: string;
};

export type LoginResponseType = {
  jwtToken: string,
  roles: string[],
  status: number,
  userId: string,
  lockCount?: number,
  mustChangePw?: number,
};

export type RegisterRequestType = {
  userId: string,
  userName: string,
  password: string,
  email: string,
  phoneNumber: string,
  roleId: number,
  confirmPassword?: string,
};

export type ChangePasswordRequestType = {
  oldPassword: string,
  newPassword: string,
};

export type ChangePasswordResponseType = {
  jwtToken: string,
  roles: string[],
  status: number,
  userId: string,
  lockCount?: number,
};

