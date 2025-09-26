import { useStepStore } from "../../../stores"
import { RPAModal } from "../../shared"
import trash from "../../../asset/trash.svg"
import { RPADeleteStepModalProps } from "./RPADeleteStepModal.types"

export const RPADeleteStepModal = ({isDeleteStepModalOpen, setIsDeleteStepModalOpen, onHandleDeleteStep}: RPADeleteStepModalProps) => {
    const isLoading = useStepStore((state) => state.isLoading)

    return (
        <RPAModal
            icon={trash}
            label={"STEP 삭제"}
            description={"STEP를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."}
            confirmLoading={isLoading}
            open={isDeleteStepModalOpen}
            onOk={onHandleDeleteStep}
            onCancel={() => setIsDeleteStepModalOpen(false)}
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
