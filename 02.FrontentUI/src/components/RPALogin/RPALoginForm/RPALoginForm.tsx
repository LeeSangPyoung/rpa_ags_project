import {
  ExclamationCircleOutlined
} from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { useAuthStore } from "../../../stores";
import { LoginRequestType } from "../../../types";
import { EyeCloseIcon, EyeOpenIcon } from "../../shared";
import { RPALoginFailed } from "../RPALoginFailed";
import { RPALoginFormProps } from "./RPALoginForm.types";
import { useState } from "react";
import { RPAModal } from "../../shared/RPAModal";

export const RPALoginForm = ({
  form,
  isError,
  errorMessage,
  onFinish,
  onFinishFailed,
}: RPALoginFormProps) => {

  const isLoading = useAuthStore(state => state.isLoading)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState<boolean>(false)

  const closeModal = () => {
    setIsForgotPasswordOpen(false);
  };

  return (
    <>
      <Form
        form={form}
        name="login"
        initialValues={{ remember: false }}
        requiredMark={false}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="ID"
          name="userId"
          className="mb-4"
          rules={[{ required: true, message: "아이디를 입력해 주세요." }]}
          hasFeedback={{
            icons: ({ status }) => {
              return {
                success: <></>,
                error:
                  status === "error" ? <ExclamationCircleOutlined /> : undefined,
                warning:
                  status === "warning" ? (
                    <ExclamationCircleOutlined />
                  ) : undefined,
                validating: undefined,
              };
            },
          }}

        >
          <Input
            placeholder="ID 입력"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item<LoginRequestType>
          label="비밀번호"
          name="password"
          className="mb-4"
          rules={[{ required: true, message: "비밀번호를 입력해 주세요." }]}
          hasFeedback={{
            icons: ({ status }) => {
              return {
                success: <></>,
                error:
                  status === "error" ? <ExclamationCircleOutlined /> : undefined,
                warning: <></>,
                validating: undefined,
              };
            },
          }}
        >
          <Input.Password
            placeholder="비밀번호 입력"
            iconRender={(visible) => visible ? <EyeCloseIcon /> : <EyeOpenIcon />}
            disabled={isLoading}
          />
        </Form.Item>

        {
          isError &&
          <RPALoginFailed errorMessage={errorMessage}/>
        }


        <Form.Item>
          <Flex justify="end" align="center">
            <Typography.Link className="font-semibold" onClick={() => setIsForgotPasswordOpen(true)}>비밀번호를 잊으셨나요?</Typography.Link>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            disabled={isLoading}
          >
            로그인
          </Button>
        </Form.Item>

      </Form>
      <RPAModal
        type="info"
        label="비밀번호를 잊으셨나요?"
        description="비밀번호를 재설정하려면 시스템 관리자에게 문의해 주세요."
        open={isForgotPasswordOpen}
        onOk={closeModal}
        onCancel={closeModal}
        centered
        footer={(_, { OkBtn }) => (
          <>
            <OkBtn />
          </>
        )}
        okButtonProps={{
          className: "w-full font-semibold text-base h-[44px]"
        }}
        okText={"확인"} />
    </>
  );
};
