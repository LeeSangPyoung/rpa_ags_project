import { Form, Input, Modal, Typography } from "antd";
import { RPAResetPasswordProps } from "./RPAResetPassword.types";
import { EyeCloseIcon, EyeOpenIcon } from "../../shared";
import { PASSWORD_REGEX } from "../../../constants/constants";

export const RPAResetPassword = ({
  resetForm,
  selectedRowUsers,
  isResetPasswordModalOpen,
  onHandleResetPasswordUsers,
  setIsResetPasswordModalOpen,
}: RPAResetPasswordProps) => {

  return (
    <Modal
      title={<div className="pb-4 text-lg">비밀번호 초기화</div>}
      closable={{ "aria-label": "Custom Close Button" }}
      className="py-4 px-4"
      open={isResetPasswordModalOpen}
      onOk={() => {
        setIsResetPasswordModalOpen(false);
        resetForm.submit();
      }}
      onCancel={() => setIsResetPasswordModalOpen(false)}
      centered
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className="flex gap-4 pt-4">
          <CancelBtn />
          <OkBtn />
        </div>
      )}
      okButtonProps={{
        className: "w-1/2 font-semibold text-base h-[44px]",
      }}
      cancelButtonProps={{
        className: "w-1/2 font-semibold text-base h-[44px]",
      }}
    >
      <Form form={resetForm} layout="vertical" requiredMark={false} onFinish={onHandleResetPasswordUsers}>
        <Form.List name="resetForm">
          {(fields) =>
            fields.map(({ key, name }) => (
              <div
                key={key}
                className="mb-4 border-b-[#F5F5F5] border-b-[1px] last:border-b-0"
              >
                <div className="flex justify-between mb-2">
                  <Typography.Text className="font-normal text-[#414651]">
                    사용자 이름
                  </Typography.Text>
                  <Typography.Text className="font-medium text-[#181D27]">
                    {selectedRowUsers[name]?.userName}
                  </Typography.Text>
                </div>
                <div className="flex justify-between mb-2">
                  <Typography.Text
                    style={{ flexShrink: 0, whiteSpace: "nowrap" }}
                  >
                    이메일
                  </Typography.Text>
                  <Typography.Text
                    style={{ maxWidth: "70%", wordBreak: "break-all" }}
                  >
                    {selectedRowUsers[name]?.email}
                  </Typography.Text>
                </div>

                <Form.Item name={[name, "userId"]} hidden>
                  <Input />
                </Form.Item>
                <Form.Item
                  label={
                    <span>
                      비밀번호
                      <span className="text-red-600 ml-1">*</span>
                    </span>
                  }
                  name={[name, "password"]}
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
                        if (PASSWORD_REGEX.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "비밀번호가 충분히 강력하지 않습니다."
                        );
                      },
                    }),
                  ]}
                >
                  
                  <Input.Password
                    maxLength={200}
                    iconRender={(visible) =>
                      visible ? <EyeCloseIcon /> : <EyeOpenIcon />
                    }
                  />
                </Form.Item>
              </div>
            ))
          }
        </Form.List>
      </Form>
    </Modal>
  );
};
