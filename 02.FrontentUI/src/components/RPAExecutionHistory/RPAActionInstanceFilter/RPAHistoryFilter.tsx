import { DatePicker, Form, Modal, Select } from "antd";
import { CalendarIcon, DownIcon } from "../../shared";
import { useActionInstanceStore } from "../../../stores";
import { RPAHistoryFilterProps } from "./RPAHisotryFilter.types";

export const RPAHistoryFilter = ({
  filterForm,
  isFilterModalOpen,
  setIsFilterModalOpen,
  onHandleFilter,
}: RPAHistoryFilterProps) => {
  const isLoading = useActionInstanceStore((state) => state.isLoading);

  const onHandleSubmitForm = () => {
    filterForm.submit();
  };

  const onHandleResetForm = () => {
    filterForm.resetFields();
  };

  return (
    <Modal
      title={<div className="pb-4 font-semibold text-lg">필터</div>}
      closable={{ "aria-label": "Custom Close Button" }}
      className="p-4"
      open={isFilterModalOpen}
      onOk={onHandleSubmitForm}
      onCancel={() => setIsFilterModalOpen(false)}
      centered
      okText={"적용"}
      cancelText={"필터 초기화"}
      width= {434}
      footer={(_, { OkBtn, CancelBtn }) => (
                <div className='flex gap-4'>
                    <CancelBtn />
                    <OkBtn />
                </div>
            )}
            okButtonProps={{
                className: "w-1/2 font-semibold text-base h-[44px] bg-[#5046E4]",
                disabled: isLoading
            }}
            cancelButtonProps={{
                className:  "w-1/2 font-semibold text-base h-[44px]",
                disabled: isLoading,
                onClick: onHandleResetForm
            }}
    >
      <Form
        form={filterForm}
        layout="vertical"
        requiredMark={false}
        onFinish={onHandleFilter}
      >
        <Form.Item label="상태" name="status" className="w" validateFirst>
          <Select
            options={[
              { value: "FAIL", label: "실패" },
              { value: "RUNNING", label: "실행" },
              { value: "SUCCESS", label: "성공" },
            ]}
            disabled={isLoading}
            className="h-10"
            placeholder="상태 입력"
          />
        </Form.Item>

        <Form.Item
          label="시작일시 (From)"
          name="startTime"
          className="w"
        >
          <DatePicker
            prefix={<CalendarIcon className="mr-2" />}
            suffixIcon={<></>}
            placeholder="시작일시 입력 (From)"
            className="w-full h-10"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          label="종료일시 (To)"
          name="endTime"
          className="w"
          validateFirst
        >
          <DatePicker
            prefix={<CalendarIcon className="mr-2" />}
            suffixIcon={<></>}
            placeholder="종료일시 입력 (To)"
            className="w-full h-10"
            disabled={isLoading}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
