export type RPAEditConfirmScheduleProps = {
    isEditConfirmModalOpen: boolean,
    setIsEditConfirmModalOpen: (isEditConfirmModalOpen: boolean) => void,
    onHandleEditConfirmSchedule: () => Promise<void>,

}