import { Col } from "antd"
import { RPAActionItemProps } from "./RPAActionItem.types"

export const RPAActionItem = ({ label, data }: RPAActionItemProps) => {
    return (
        <Col className="gutter-row" flex="1">
            <div className="text-base font-normal text-placeholder mb-1">{label}</div>
            {data}
        </Col>
    )
}
