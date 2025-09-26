import { Form, Input, Modal } from "antd";
import { useAccountGroupStore } from "../../../stores";
import { RPAEditAccountGroupModalProps } from "./RPAEditAccountGroupModal.types";

const MAX_LENGTH = 255;

export const RPAEditAccountGroupModal = ({
  id,
  editAccountGroupForm,
  isOpenEditAccountGroupModal,
  setIsOpenEditAccountGroupModal,
  onHandleEditAccountGroup,
}: RPAEditAccountGroupModalProps) => {
  const isLoading = useAccountGroupStore((state) => state.isLoading);

  return (
    <Modal
      title={<div className="pb-4 text-lg text-button-secondary-fg">편집</div>}
      closable={{ "aria-label": "Custom Close Button" }}
      style={{ width: "434", height: "238" }}
      open={isOpenEditAccountGroupModal}
      centered
      onOk={() => editAccountGroupForm.submit()}
      onCancel={() => setIsOpenEditAccountGroupModal(false)}
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className="flex gap-4">
          <CancelBtn />
          <OkBtn />
        </div>
      )}
      okButtonProps={{
        className: "w-1/2 font-semibold text-base h-[44px] bg-[#5046E4]",
        disabled: isLoading,
      }}
      cancelButtonProps={{
        className: "w-1/2 font-semibold text-base h-[44px]",
        disabled: isLoading,
      }}
    >
      <Form
        form={editAccountGroupForm}
        layout="vertical"
        requiredMark={false}
        onFinish={onHandleEditAccountGroup}
      >
        <Form.Item name="id" initialValue={id} className="hidden">
          <Input type="hidden" />
        </Form.Item>
        <div className="flex justify-between mb-0  pb-2">
          <Form.Item
            label={
              <span>
                그룹명
                <span className="text-red-600 ml-1">*</span>
              </span>
            }
            name="groupName"
            className="w-full"
            validateFirst
            rules={[
              {
                required: true,
                message: "그룹명 입력해 주세요.",
              },
            ]}
            normalize={value => value ? value.trim() : value}
          >
            <Input
              placeholder=" 입력 그룹명"
              className="h-10 w-full"
              disabled={isLoading}
              maxLength={MAX_LENGTH}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
