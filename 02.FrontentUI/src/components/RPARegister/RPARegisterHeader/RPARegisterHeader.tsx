import { Flex, Typography } from "antd"
import sk_logo from "../../../asset/Logomark.svg";

export const RPARegisterHeader = () => {
  return (
    <Flex vertical gap={16}>
      <img src={sk_logo} className="w-12 h-12" alt=""/>
      <Flex vertical gap={8}>
        <Typography.Title level={2} className="m-0">
          회원 가입하기
        </Typography.Title>
        <Typography.Text className="text-[#717680]">
          로그인하려면 회원가입을 해주세요.
        </Typography.Text>
      </Flex>
    </Flex>
  )
}
