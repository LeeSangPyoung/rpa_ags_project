import { FormInstance } from "antd"

export type RPAEditAccountGroupModalProps = {
    id : number | undefined,
    editAccountGroupForm: FormInstance<any>,
    isOpenEditAccountGroupModal: boolean,
    setIsOpenEditAccountGroupModal: (isModalOpen: boolean) => void,
    onHandleEditAccountGroup: ((values: any) => void) | undefined
}