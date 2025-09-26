import { FormInstance } from "antd"

export type RPAEditStepModalProps = {
    editStepForm: FormInstance<any>,
    isOpenEditStepModal: boolean,
    setIsOpenEditStepModal: (isModalOpen: boolean) => void,
    onHandleEditStep: ((values: any) => void) | undefined

}