import { ActionList } from "../../../types";

export type RPADeleteScheduleProps = {
    selectedAction: ActionList[] | undefined,
    isDeleteModalOpen: boolean,
    isError?: boolean,
    setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void,
    onHandleDeleteSchedule: () => Promise<void>,

}