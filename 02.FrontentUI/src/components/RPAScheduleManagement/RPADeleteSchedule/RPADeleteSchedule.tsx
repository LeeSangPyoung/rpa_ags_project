import { RPAModal } from "../../shared"
import trash from "../../../asset/trash.svg"
import { useScheduleStore } from "../../../stores"
import { RPADeleteScheduleProps } from "./RPADeleteSchedule.types"

export const RPADeleteSchedule = ({selectedAction, isDeleteModalOpen, isError, setIsDeleteModalOpen, onHandleDeleteSchedule}: RPADeleteScheduleProps) => {

    const isLoading = useScheduleStore((state) => state.isLoading)

    return (
        <RPAModal
            icon={trash}
            label={isError ? "문제가 발생했습니다" : "레코드 삭제"}
            description={isError
                ? '요청을 처리하는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.'
                : `${selectedAction?.length && selectedAction?.length > 1 ? `${selectedAction?.length}개의 레코드를` : '이 레코드를'} 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
            confirmLoading={isLoading}
            open={isDeleteModalOpen}
            onOk={onHandleDeleteSchedule}
            onCancel={() => setIsDeleteModalOpen(false)}
            centered
            okText={"삭제"}
            cancelText={"취소"}
            footer={(_, { OkBtn, CancelBtn }) => isError ? (
                <CancelBtn />
            ) : (
                <div className='flex gap-4'>
                    <CancelBtn />
                    <OkBtn />
                </div>
            )}
            okButtonProps={{
                className: "w-1/2 font-semibold text-base h-[44px] bg-[#D92D20]",
                disabled: isLoading
            }}
            cancelButtonProps={{
                className: `${isError ? 'w-full' : 'w-1/2'} font-semibold text-base h-[44px]`,
                disabled: isLoading
            }}
        />
    )
  
}
