import { Flex, Row } from "antd"
import { RPAActionDetailProps } from "./RPAActionDetail.types"
import { RPAActionItem } from "../RPAActionItem"

export const RPAActionDetail = ({ action }: RPAActionDetailProps) => {
  return (
    <Flex vertical gap={'12px'}>
      <Row gutter={12} className="pb-2">
        <RPAActionItem label="RPA명" data={<div className="font-medium text-[#414651] text-base">{action.name}</div>} />
        <RPAActionItem label="스케줄링" data={<div className="font-medium text-[#414651] text-base">{action.cronExpression}</div>} />
        <RPAActionItem label="다음실행일시" data={<div className="font-medium text-[#414651] text-base">{action.nextRunTime}</div>} />
        <RPAActionItem label="상태" data={<div className="font-medium text-[#414651] text-base">{action.status}</div>} />
        <RPAActionItem label="반복유무" data={<div className="font-medium text-[#414651] text-base">{action.repeatable ? "예" : "아니오"}</div>} />
      </Row>

      <Row gutter={12} className="pb-2">
        <RPAActionItem label="시작일시" data={<div className="font-medium text-[#414651] text-base">{action.startDate}</div>} />
        <RPAActionItem label="종료일시" data={<div className="font-medium text-[#414651] text-base">{action.endDate}</div>} />
        <RPAActionItem label="설명" data={<div className="font-medium text-[#414651] text-base">{action.description}</div>} />
        <RPAActionItem label="등록자" data={<div className="font-medium text-[#414651] text-base">{action.frstRegUserId}</div>} />
        <RPAActionItem label="등록일시" data={<div className="font-medium text-[#414651] text-base">{action.frstRegDate}</div>} />
      </Row>

      <Row gutter={12} className="pb-2">
        <RPAActionItem label="수정자" data={<div className="font-medium text-[#414651] text-base">{action.chgRegUserId}</div>} />
        <RPAActionItem label="수정일시" data={<div className="font-medium text-[#414651] text-base">{action.chgRegDate}</div>} />
        <RPAActionItem />
        <RPAActionItem />
        <RPAActionItem />
      </Row>
    </Flex>
  )
}
