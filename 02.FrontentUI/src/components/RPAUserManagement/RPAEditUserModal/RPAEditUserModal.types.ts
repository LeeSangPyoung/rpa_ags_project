import { FormInstance } from "antd";
import { UserList } from "../../../types";

export type RPAEditUserModalProps = {
    isModalOpen: boolean,
    isEditUserModalOpen: boolean,
    userInfoSelected: UserList | undefined, 
    editUserForm: FormInstance<any>,
    setIsEditUserModalOpen:(value: boolean) => void,
    onCloseEditUserModal: () => void,
    onEditUserFinish: ((values: any) => void) | undefined,
}