import { useAccountGroupStore } from "../../../stores"
import { RPAModal } from "../../shared"
import trash from "../../../asset/trash.svg"
import { RPADeleteAccountGroupModalProps } from "./RPADeleteAccountGroupModal.types"

export const RPADeleteAccountGroupModal = ({isDeleteAccountGroupModalOpen, setIsDeleteAccountGroupModalOpen, onHandleDeleteAccountGroup}: RPADeleteAccountGroupModalProps) => {
    const isLoading = useAccountGroupStore((state) => state.isLoading)

    return (
        <RPAModal
            icon={trash}
            label={"RPA 계정 그룹 삭제"}
            description={"RPA 계정 그룹을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."}
            confirmLoading={isLoading}
            open={isDeleteAccountGroupModalOpen}
            onOk={onHandleDeleteAccountGroup}
            onCancel={() => setIsDeleteAccountGroupModalOpen(false)}
            centered
            okText={"삭제"}
            cancelText={"취소"}
            footer={(_, { OkBtn, CancelBtn }) =>
                <div className='flex gap-4'>
                    <CancelBtn />
                    <OkBtn />
                </div>
            }
            okButtonProps={{
                className: "w-1/2 font-semibold text-base h-[44px] bg-[#D92D20]",
                disabled: isLoading
            }}
            cancelButtonProps={{
                className: "w-1/2 font-semibold text-base h-[44px]",
                disabled: isLoading
            }}
        />
    )
}
