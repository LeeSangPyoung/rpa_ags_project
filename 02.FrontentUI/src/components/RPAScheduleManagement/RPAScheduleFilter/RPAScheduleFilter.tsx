import { DatePicker, Form, Modal, Select } from "antd"
import { CalendarIcon, DownIcon } from "../../shared"
import { useScheduleStore } from "../../../stores/useScheduleStore"
import { RPAScheduleFilterProps } from "./RPAScheduleFilter.types"

export const RPAScheduleFilter = ({ filterForm, isFilterModalOpen, setIsFilterModalOpen, onHandleFilter }: RPAScheduleFilterProps) => {

  const isLoading = useScheduleStore((state) => state.isLoading)

  const onHandleSubmitForm = () => {
    filterForm.submit()
  }

  const onHandleResetForm = () => {
    filterForm.resetFields()
  }

  return (
    <Modal
      title={<div className="pb-4 font-semibold text-lg">필터</div>}
      closable={{ 'aria-label': 'Custom Close Button' }}
      className='p-4'
      open={isFilterModalOpen}
      onOk={onHandleSubmitForm}
      onCancel={() => setIsFilterModalOpen(false)}
      centered
      okText={'적용'}
      cancelText={'필터 초기화'}
      width={'45%'}
      okButtonProps={{ size: "large" }}
      cancelButtonProps={{ size: "large", onClick: onHandleResetForm }}
    >
      <Form form={filterForm} layout="vertical" requiredMark={false} onFinish={onHandleFilter}>
        <div className="flex justify-between mb-0 space-x-3">
          <Form.Item
            label="상태"
            name="status"
            className="w-1/2"
            validateFirst
          >
            <Select options={[{ value: "ACTIVE", label: "ACTIVE" }, { value: "INACTIVE", label: "INACTIVE" }]} disabled={isLoading}
              suffixIcon={<DownIcon />}
              className="h-10"
              placeholder="상태 입력"
            />
          </Form.Item>

          <Form.Item
            label="반복유무"
            name="repeatable"
            className="w-1/2"
            validateFirst
          >
            <Select options={[{ value: true, label: "예" }, { value: false, label: "아니오" }]} disabled={isLoading}
              suffixIcon={<DownIcon />}
              className="h-10"
              placeholder="반복유무 입력"
            />
          </Form.Item>
        </div>

        <div className="flex justify-between space-x-3">
          <Form.Item
            label="시작일시 (From)"
            name="startDateFrom"
            className="w-1/2"
          >
            <DatePicker prefix={<CalendarIcon className="mr-2" />} suffixIcon={<></>} placeholder="시작일시 입력 (From)" className="w-full h-10" disabled={isLoading} />
          </Form.Item>

          <Form.Item
            label="시작일시 (To)"
            name="startDateTo"
            className="w-1/2"
            validateFirst
          >
            <DatePicker prefix={<CalendarIcon className="mr-2" />} suffixIcon={<></>} placeholder="시작일시 입력 (To)" className="w-full h-10" disabled={isLoading} />
          </Form.Item>
        </div>

        <div className="flex justify-between space-x-3">
          <Form.Item
            label="종료일시 (From)"
            name="endDateFrom"
            className="w-1/2"
          >
            <DatePicker prefix={<CalendarIcon className="mr-2" />} suffixIcon={<></>} placeholder="종료일시 입력 (From)" className="w-full h-10" disabled={isLoading} />
          </Form.Item>

          <Form.Item
            label="종료일시 (To)"
            name="endDateTo"
            className="w-1/2"
            validateFirst
          >
            <DatePicker prefix={<CalendarIcon className="mr-2" />} suffixIcon={<></>} placeholder="종료일시 입력 (To)" className="w-full h-10" disabled={isLoading} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}
