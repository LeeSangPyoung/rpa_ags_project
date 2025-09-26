import { InputProps, InputRef } from "antd"
import { ReactElement } from "react"

export type RPASearchActionProps = InputProps & {
    filterDropdownText?: string
    filterAction?: ReactElement
    actionButton?: ReactElement
    inputRef?:  React.Ref<InputRef>
    mtClass?: string
}