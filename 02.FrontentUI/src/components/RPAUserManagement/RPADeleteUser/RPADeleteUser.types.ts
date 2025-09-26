export type RPADeleteUserProps = {
    selectedUsers: (string | undefined)[],
    isError?: boolean,
    isDeleteUserModalOpen: boolean,
    onHandleDeleteUsers: () => Promise<void>, 
    setIsDeleteUserModalOpen: (isDeleteUserModalOpen: boolean) => void
}