import { Form, Input, Modal, Select } from "antd";
import { RPAInputPassword, RPATooltipContent } from "../../shared";
import { PASSWORD_REGEX } from "../../../constants/constants";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores";
import { RPACreateUserModalProps } from "./RPACreateUserModal.types";
import { useRoleOptions } from '../../../hooks/useCombobox'


export const RPACreateUserModal = ({ createUserForm, isCreateUserModalOpen, setIsCreateUserModalOpen, onFinish }: RPACreateUserModalProps) => {
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const [isUpperLowerValid, setIsUpperLowerValid] = useState(false);
  const [isSpecialValid, setIsSpecialValid] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const isLoading = useAuthStore((state) => state.isLoading)
  const {roleOptions, roleLoading} = useRoleOptions();

  const password = Form.useWatch("password", createUserForm);

  useEffect(() => {
    if (!isCreateUserModalOpen) {
      createUserForm.resetFields();
    }
  }, [isCreateUserModalOpen, createUserForm]);

  useEffect(() => {
    setIsUpperLowerValid(/[a-z]/.test(password) && /[A-Z]/.test(password));
    setIsSpecialValid(/[!@#$%^&*]/.test(password));
    setIsNumberValid(/[0-9]/.test(password));
    setIsLengthValid(password?.length >= 10);
  }, [password]);

  const tooltipData = [
    { condition: isUpperLowerValid, text: "대문자와 소문자를 모두 포함해야 합니다 (A-Z, a-z)" },
    { condition: isSpecialValid, text: "특수 문자를 최소 하나 이상 포함해야 합니다 (!@#$%^&*)" },
    { condition: isNumberValid, text: "숫자를 최소 하나 이상 포함해야 합니다 (0-9)" },
    { condition: isLengthValid, text: "10자 이내여야 합니다" },
  ]

  const onSubmitCreateUserForm = () => {
    createUserForm.submit()
  }
  return (
    <Modal
      title={<div className="pb-4 text-lg text-button-secondary-fg">사용자 추가</div>}
      closable={{ 'aria-label': 'Custom Close Button' }}
      className='py-4 px-4'
      open={isCreateUserModalOpen}
      onOk={onSubmitCreateUserForm}
      onCancel={() => setIsCreateUserModalOpen(false)}
      centered
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className='flex gap-4'>
          <CancelBtn />
          <OkBtn />
        </div>
      )}

      okButtonProps={{
        className: "w-1/2 font-semibold text-base h-[44px]"
      }}
      cancelButtonProps={{
        className: "w-1/2 font-semibold text-base h-[44px]"
      }}
    >
      <Form form={createUserForm} layout="vertical" requiredMark={false} onFinish={onFinish} className="py-4">
        <Form.Item
          label="이름"
          name="userName"
          rules={[
            {
              min: 6,
              max: 50,
              message: "사용자 이름을 6자에서 50자 사이로 입력해 주세요.",
            },
          ]}
        >
          <Input allowClear placeholder="이름 입력" disabled={isLoading} />
        </Form.Item>

        <div className="flex justify-between">
          <Form.Item
            label={
              <span>
                ID
                <span className = "text-red-700 ml-1">*</span>
              </span>
            }

            name="userId"
            className="w-1/2 mr-[6px]"
            rules={[
              {
                required: true,
                message: "아이디를 입력해 주세요.",
              },
              {
                min: 6,
                max: 50,
                message: "아이디를 6자에서 50자 사이로 입력해 주세요."
              }
            ]}
          >
            <Input allowClear placeholder="ID 입력" disabled={isLoading} />
          </Form.Item>

          <Form.Item
            label={
              <span>
                전화번호
                <span className = "text-red-700 ml-1">*</span>
              </span>
            }

            name="phoneNumber"
            className="w-1/2 ml-[6px]"
            validateFirst
            rules={[
              {
                required: true,
                message: "전화번호를 입력해 주세요.",
              },

              () => ({
                validator(_, value) {
                  if (/^\d{11}$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject("전화번호는 숫자여야 하며 11자리여야 합니다.");
                },
              }),
            ]}
          >
            <Input allowClear placeholder="전화번호 입력" disabled={isLoading} />
          </Form.Item>
        </div>


        <Form.Item
          label={
            <span>
              역할
              <span className = "text-red-700 ml-1">*</span>
            </span>
          }

          name="roleId"
          rules={[
            {
              required: true,
              message: "역할을 선택해 주세요.",
            },
          ]}
        >
          <Select
            placeholder="역할 선택"
            options={roleOptions}
            disabled={roleLoading}
            className="h-10"
          ></Select>
        </Form.Item>

        <Form.Item
          label={
            <span>
              이메일
              <span className = "text-red-700 ml-1">*</span>
            </span>
          }

          name="email"
          rules={[
            {
              type: "email",
              message: "입력하신 이메일 형식이 올바르지 않습니다.",
            },
            {
              max: 140,
              message: "이메일은 140자 이내여야 합니다."
            },
            {
              required: true,
              message: "이메일을 입력해 주세요.",
            },
          ]}
        >
          <Input allowClear placeholder="이메일 주소 입력" disabled={isLoading} maxLength={140}/>
        </Form.Item>

        <Form.Item
          label={
            <span>
              비밀번호
              <span className = "text-red-700 ml-1">*</span>
            </span>
          }

          name="password"
          validateFirst
          rules={[
            {
              required: true,
              message: "새 비밀번호 입력해 주세요.",
            },
            {
              max: 200,
              message: "비밀번호는 200자 이내여야 합니다.",
            },
            () => ({
              validator(_, value) {
                if (
                  PASSWORD_REGEX.test(
                    value
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject("비밀번호가 충분히 강력하지 않습니다.");
              },
            }),
          ]}
        >

          <RPAInputPassword
            placeholder="비밀번호 입력"
            haveTooltip={true}
            onClear={() => { }}
            onInput={() => {
              setIsTooltipOpened?.(true);
            }}
            onMouseLeave={() => {
              setIsTooltipOpened?.(false);
            }}
            tooltipContent={<RPATooltipContent tooltipItems={tooltipData} />}
            isTooltipOpened={isTooltipOpened}
            setIsTooltipOpened={setIsTooltipOpened} />

        </Form.Item>

        <Form.Item
          label={
            <span>
              비밀번호 확인
              <span className = "text-red-700 ml-1">*</span>
            </span>
          }
          name="password-confirm"
          dependencies={["password"]}
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

          rules={[
            {
              required: true,
              message: "비밀번호 확인해 주세요.",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
                );
              },
            }),
          ]}
        >
          <RPAInputPassword placeholder="비밀번호 확인" disabled={isLoading} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

