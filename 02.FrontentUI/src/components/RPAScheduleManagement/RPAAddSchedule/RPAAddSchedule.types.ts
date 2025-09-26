import { FormInstance } from "antd";

export type RPAAddScheduleProps = {
    addForm:FormInstance<any>,
     isAddScheduleModalOpen: boolean,
     setIsAddScheduleModalOpen: (isAddScheduleModalOpen: boolean) => void,
     onHandleAddSchedule:((values: any) => void) | undefined,
}