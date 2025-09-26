import { FormInstance } from "antd"

export type RPAAddAccountGroupModalProps = {
    addAccountGroupForm: FormInstance<any>,
    isOpenAddAccountGroupModal: boolean,
    setIsOpenAddAccountGroupModal: (isModalOpen: boolean) => void,
    onHandleAddAccountGroup: ((values: any) => void) | undefined
}