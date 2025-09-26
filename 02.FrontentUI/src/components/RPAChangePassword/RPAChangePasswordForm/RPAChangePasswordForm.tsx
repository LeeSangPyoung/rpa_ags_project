import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import { RPAInputPassword } from '../../shared';
import { ChangePasswordFieldType, RPAChangePasswordFormProps } from './RPAChangePasswordForm.types';

export const RPAChangePasswordForm = ({ form, onFinish, onFinishFailed }: RPAChangePasswordFormProps) => {
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);

  const [isUpperLowerValid, setIsUpperLowerValid] = useState(false);
  const [isSpecialValid, setIsSpecialValid] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);

  const password = Form.useWatch("newPassword", form);

  useEffect(() => {
    setIsUpperLowerValid(/[a-z]/.test(password) && /[A-Z]/.test(password));
    setIsSpecialValid(/[!@#$%^&*]/.test(password));
    setIsNumberValid(/[0-9]/.test(password));
    setIsLengthValid(password?.length >= 10);
  }, [password]);

  const handleOnclick = () => {
    if (
      !isUpperLowerValid ||
      !isSpecialValid ||
      !isNumberValid ||
      !isLengthValid
    ) {
      setIsTooltipOpened(true);
    }
  };

  const tooltipContent = (
    <>
      <div>
        <CheckCircleFilled
          className={`${isUpperLowerValid ? "text-[#47CD89]" : "text-[#A4A7AE]"} pr-2 `}
        />
        <span>
          대문자와 소문자를 모두 포함해야 합니다 (A-Z, a-z)
        </span>
      </div>
      <div>
        <CheckCircleFilled
          className={`${isSpecialValid ? "text-[#47CD89]" : "text-[#A4A7AE]"} pr-2 `}
        />
        <span>특수 문자를 최소 하나 이상 포함해야 합니다 (!@#$%^&*)</span>
      </div>
      <div>
        <CheckCircleFilled
          className={`${isNumberValid ? "text-[#47CD89]" : "text-[#A4A7AE]"} pr-2 `}
        />
        <span>숫자를 최소 하나 이상 포함해야 합니다 (0-9)</span>
      </div>
      <div>
        <CheckCircleFilled
          className={`${isLengthValid ? "text-[#47CD89]" : "text-[#A4A7AE]"} pr-2 `}
        />
        <span>10자 이내여야 합니다</span>
      </div>
    </>
  );

  return (
    <>
      <Form form={form} name="changePassword" layout="vertical" size={"large"}
        initialValues={{ remember: false }}
        requiredMark={false}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<ChangePasswordFieldType>
          label="현재 비밀번호"
          name="oldPassword"
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
          rules={[
            {
              required: true,
              message: "현재 비밀번호 입력해주세요!",
            },
          ]}
        >
          <RPAInputPassword placeholder="현재 비밀번호 입력" />
        </Form.Item>

        <Form.Item<ChangePasswordFieldType>
          label="새 비밀번호"
          name="newPassword"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: "새 비밀번호 입력해주세요!",
            },
            () => ({
              validator(_, value) {
                if (
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,200}$/.test(
                    value
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 충분히 강력하지 않습니다.")
                );
              },
            }),
          ]}

        >
          <RPAInputPassword
            placeholder="새 비밀번호 입력"
            haveTooltip={true}
            onInput={() => {
              setIsTooltipOpened?.(true);
            }}
            onMouseLeave={() => {
              setIsTooltipOpened?.(false);
            }}
            tooltipContent={tooltipContent}
            isTooltipOpened={isTooltipOpened}
            setIsTooltipOpened={setIsTooltipOpened} />
        </Form.Item>

        <Form.Item<ChangePasswordFieldType>
          label="비밀번호 확인"
          name="confirmPassword"
          dependencies={["password"]}
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
          rules={[
            {
              required: true,
              message: "비밀번호 확인 입력해주세요!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
                );
              },
            }),
          ]}
        >
          <RPAInputPassword placeholder="비밀번호 확인" />
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className='mt-8'
            onClick={handleOnclick}
          >
            다음
          </Button>
        </Form.Item>
      </Form>
    </>
  );

}
