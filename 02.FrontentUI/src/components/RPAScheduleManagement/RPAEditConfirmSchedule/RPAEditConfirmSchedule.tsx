import { RPAModal } from "../../shared"
import info from "../../../asset/info.svg"
import { useScheduleStore } from "../../../stores"
import { RPAEditConfirmScheduleProps } from "./RPAEditConfirmSchedule.types"

export const RPAEditConfirmSchedule = ({ isEditConfirmModalOpen, setIsEditConfirmModalOpen, onHandleEditConfirmSchedule}: RPAEditConfirmScheduleProps) => {

    const isLoading = useScheduleStore((state) => state.isLoading)

    return (
        <RPAModal
            icon={info}
            label={"수정 확인"}
            description={"선택한 기록의 변경 사항을 저장하시겠습니까?"}
            confirmLoading={isLoading}
            open={isEditConfirmModalOpen}
            onOk={onHandleEditConfirmSchedule}
            onCancel={() => setIsEditConfirmModalOpen(false)}
            centered
            okText={"확인"}
            cancelText={"취소"}
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
                disabled: isLoading
            }}
        />
    )
  
}
