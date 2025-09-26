import { RPAModal } from "../../shared"
import { useUserStore } from "../../../stores/useUserStore"
import { RPARejectUserProps } from "./RPARejectUser.types"
import warning from "../../../asset/wanring-red.svg"

export const RPARejectUserModal = ({ selectedUsers, isRejectUserModalOpen, onHandleRejectUsers, setIsRejectUserModalOpen }: RPARejectUserProps) => {

    const isLoading = useUserStore((state) => state.isLoading)

    return (
        <RPAModal
            icon={warning}
            label={"거절 요청 확인."}
            description={
                `${selectedUsers.length > 1 ? `선택한 ${selectedUsers.length}개의 요청을 거절하시겠습니까? 이 작업은 되돌릴 수 없습니다.` : '이 요청을 거절하시겠습니까? 이 작업은 되돌릴 수 없습니다.'}`}
            confirmLoading={isLoading}
            open={isRejectUserModalOpen}
            onOk={onHandleRejectUsers}
            onCancel={() => setIsRejectUserModalOpen(false)}
            centered
            okText={"삭제"}
            cancelText={"취소"}
            footer={(_, { OkBtn, CancelBtn }) => (
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
                className:  "w-1/2 font-semibold text-base h-[44px]",
                disabled: isLoading
            }}
        />
    )
}
