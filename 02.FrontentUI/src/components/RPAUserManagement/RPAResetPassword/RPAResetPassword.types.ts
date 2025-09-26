import { FormInstance } from "antd";
import { UserList } from "../../../types";

export type RPAResetPasswordProps = {
    resetForm: FormInstance<any>,
    selectedRowUsers: UserList[],
    isResetPasswordModalOpen: boolean,
    onHandleResetPasswordUsers:((values: any) => void) | undefined,
    setIsResetPasswordModalOpen: (isResetPasswordModalOpen: boolean) => void,

}