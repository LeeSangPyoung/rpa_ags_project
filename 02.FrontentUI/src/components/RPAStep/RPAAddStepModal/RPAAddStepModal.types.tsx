import { FormInstance } from "antd"

export type RPAAddStepModalProps = {
    actionId?: number,
    addStepForm: FormInstance<any>,
    isOpenAddStepModal: boolean,
    setIsOpenAddStepModal: (isModalOpen: boolean) => void,
    onHandleAddStep: ((values: any) => void) | undefined

}