export type RPADeleteAccountGroupModalProps = {
    isDeleteAccountGroupModalOpen: boolean,
    setIsDeleteAccountGroupModalOpen: (isModalOpen: boolean) => void,
    onHandleDeleteAccountGroup: ((values: any) => void) | undefined
}