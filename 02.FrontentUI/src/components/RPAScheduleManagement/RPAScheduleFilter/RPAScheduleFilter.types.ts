import { FormInstance } from "antd";
import { ActionScheduleRequest } from "../../../types";

export type RPAScheduleFilterProps = {
    filterForm: FormInstance<any>,
    isFilterModalOpen: boolean,
    setIsFilterModalOpen: (isFilterModalOpen: boolean) => void,
    onHandleFilter: ((values: ActionScheduleRequest) => void) | undefined,

}