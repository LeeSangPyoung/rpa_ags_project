import { FormInstance } from "antd"

export type RPAModifyScheduleProps = {
    editForm: FormInstance<any>
    onHandleEditSchedule: ((values: any) => void) | undefined,
}