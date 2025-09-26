import { FormInstance } from "antd";
import { ActionInstanceRequest } from "../../../types";

export type RPAHistoryFilterProps = {
    filterForm: FormInstance<any>,
    isFilterModalOpen: boolean,
    setIsFilterModalOpen: (isFilterModalOpen: boolean) => void,
    onHandleFilter: ((values: ActionInstanceRequest) => void) | undefined,

}