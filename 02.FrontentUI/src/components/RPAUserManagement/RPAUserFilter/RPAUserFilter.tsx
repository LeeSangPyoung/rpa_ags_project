import { DatePicker, Form, Modal, Select } from "antd"
import { RPAUserFilterProps } from "./RPAUserFilter.types"
import { CalendarIcon, DownIcon } from "../../shared"
import { useUserStore} from "../../../stores"

export const RPAUserFilter = ({ filterForm, isFilterModalOpen, setIsFilterModalOpen, onHandleFilter }: RPAUserFilterProps) => {

    const isLoading = useUserStore(state => state.isLoading)
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
            footer={(_, { OkBtn, CancelBtn }) => (
                <div className='flex gap-4 py-4'>
                    <CancelBtn />
                    <OkBtn />
                </div>
            )}
            okButtonProps={{
                className: "w-1/2 font-semibold text-base h-[44px]",
                disabled: isLoading
            }}
            cancelButtonProps={{
                className: ` w-1/2 font-semibold text-base h-[44px]`,
                disabled: isLoading,
                onClick: onHandleResetForm
            }}
        >
            <Form form={filterForm} layout="vertical" requiredMark={false} onFinish={onHandleFilter}>

                <Form.Item
                    label="역할"
                    name="roleId"
                    validateFirst
                >
                    <Select options={[{ value: 1, label: "ADMIN" }, { value: 2, label: "USER" }, { value: 3, label: "GUEST" }]} disabled={isLoading}
                        suffixIcon={<DownIcon />}
                        className="h-10"
                        placeholder="상태 입력"
                    />
                </Form.Item>

                
                <Form.Item
                    label="상태"
                    name="status"
                    validateFirst
                >
                    <Select options={[{ value: 1, label: "활성화됨" }, { value: 2, label: "승인요청" }, { value: 3, label: "잠김" }, { value: 4, label: "반려" }]} disabled={isLoading}
                        suffixIcon={<DownIcon />}
                        className="h-10"
                        placeholder="상태 입력"
                    />
                </Form.Item>

                <Form.Item
                    label="등록일자"
                    name="createdAt"
                >
                    <DatePicker prefix={<CalendarIcon className="mr-2" />} suffixIcon={<></>} placeholder="등록일자 입력" className="w-full h-10" disabled={isLoading} />
                </Form.Item>

                <Form.Item
                    label="승인일자"
                    name="approveDate"
                    validateFirst
                >
                    <DatePicker prefix={<CalendarIcon className="mr-2" />} suffixIcon={<></>} placeholder="승인일자 입력" className="w-full h-10" disabled={isLoading} />
                </Form.Item>
            </Form>
        </Modal >
  )
}
