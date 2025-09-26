export type RPARejectUserProps = {
    selectedUsers: (string | undefined)[],
    isRejectUserModalOpen: boolean,
    onHandleRejectUsers: () => Promise<void>, 
    setIsRejectUserModalOpen: (isRejectUserModalOpen: boolean) => void
}