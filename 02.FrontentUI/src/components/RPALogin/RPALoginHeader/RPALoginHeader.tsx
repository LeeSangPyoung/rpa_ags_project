import React from "react";
import sk_logo from "../../../asset/Logomark.svg";
import { Flex, Typography } from "antd";

export const RPALoginHeader: React.FC = () => {
  return (
    <Flex vertical gap={16}>
      <img src={sk_logo} className="w-12 h-12" alt=""/>
      <Flex vertical gap={8}>
        <Typography.Title level={1} className="m-0">
          로그인
        </Typography.Title>
        <Typography.Text className="text-[#717680] text-base">
          환영합니다. 로그인 정보를 입력하세요.
        </Typography.Text>
      </Flex>
    </Flex>
  );
};
