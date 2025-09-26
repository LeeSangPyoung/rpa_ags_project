import { CheckCircleFilled } from "@ant-design/icons"
import { RPATooltipContentProps } from "./RPATooltipContent.types"

export const RPATooltipContent = ({ tooltipItems }: RPATooltipContentProps) => {

    return (
        <div className="px-3 py-4">
            {tooltipItems.map((item) => (

                <div>
                    <CheckCircleFilled
                    className={`${item.condition ? "text-[#47CD89]" : "text-[#A4A7AE]"} pr-2`}
                    />
                    <span>
                        {item.text}
                    </span>
                </div>
            ))
            }
        </div>
    )
}
