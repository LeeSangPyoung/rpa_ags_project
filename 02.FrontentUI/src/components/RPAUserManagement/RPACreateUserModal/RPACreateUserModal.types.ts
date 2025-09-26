import { FormInstance } from "antd"
import { RegisterRequestType } from "../../../types"

export type RPACreateUserModalProps = {
    createUserForm: FormInstance<any>,
    isCreateUserModalOpen: boolean,
    setIsCreateUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onFinish: (values: RegisterRequestType) => void
}