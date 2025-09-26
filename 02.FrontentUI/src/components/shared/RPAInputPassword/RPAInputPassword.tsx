import { Flex, Input, Tooltip } from "antd"
import { EyeCloseIcon, EyeOpenIcon } from "../RPAIcons"
import { RPAInputPasswordProps } from "./RPAInputPassword.types"
import { ExclamationCircleOutlined } from "@ant-design/icons"


export const RPAInputPassword = ({ haveTooltip = false, isTooltipOpened, tooltipContent, setIsTooltipOpened, ...props }: RPAInputPasswordProps) => {
    if (haveTooltip) {
        return (
            <Input.Password
                {...props}
                onClear={() => { }}
                iconRender={(visible) => (
                    <Flex align="center" gap={8}>
                        {visible ? <EyeCloseIcon /> : <EyeOpenIcon />}
                        <Tooltip
                            title={tooltipContent}
                            placement='topRight'
                            styles={{
                                body: { width: "440px", backgroundColor: "#535862" },
                            }}
                            open={isTooltipOpened}
                            fresh
                        >
                            <ExclamationCircleOutlined
                                className="w-[14px] h-[14px]"
                                onMouseOver={() => {
                                    setIsTooltipOpened?.(true);
                                }}
                                onMouseLeave={() => {
                                    setIsTooltipOpened?.(false);
                                }}
                            />
                        </Tooltip>

                    </Flex>)}
            />
        )
    } else {
        return (
            <Input.Password
                {...props}
                iconRender={(visible) => visible ? <EyeCloseIcon /> : <EyeOpenIcon />}
            />
        )
    }


}
