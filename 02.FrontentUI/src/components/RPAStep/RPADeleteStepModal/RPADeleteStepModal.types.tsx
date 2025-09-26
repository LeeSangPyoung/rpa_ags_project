export type RPADeleteStepModalProps = {
    isDeleteStepModalOpen: boolean,
    setIsDeleteStepModalOpen: (isModalOpen: boolean) => void,
    onHandleDeleteStep: () => Promise<void>

}