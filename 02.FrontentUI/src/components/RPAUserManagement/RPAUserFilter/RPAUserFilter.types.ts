import { FormInstance } from "antd";
import { UserManagementRequest } from "../../../types";

export type RPAUserFilterProps = {
    filterForm: FormInstance<any>,
    isFilterModalOpen: boolean,
    setIsFilterModalOpen: (isFilterModalOpen: boolean) => void,
    onHandleFilter: ((values: UserManagementRequest) => void) | undefined,

}