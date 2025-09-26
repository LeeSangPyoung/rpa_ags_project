import { PasswordProps } from "antd/es/input";
import { ReactNode } from "react";

export type RPAInputPasswordProps = PasswordProps & {
    haveTooltip?: boolean,
    tooltipContent?: React.ReactNode | (() => ReactNode),
    isTooltipOpened?: boolean,
    setIsTooltipOpened?:(visible: boolean) => void,
}