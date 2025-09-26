import { RPAModal } from "../../shared"
import { useUserStore } from "../../../stores/useUserStore"
import { RPADeleteUserProps } from "./RPADeleteUser.types"
import trash from "../../../asset/trash.svg"
import warning from "../../../asset/wanring-red.svg"

export const RPADeleteUser = ({ selectedUsers, isError, isDeleteUserModalOpen, onHandleDeleteUsers, setIsDeleteUserModalOpen }: RPADeleteUserProps) => {

    const isLoading = useUserStore((state) => state.isLoading)
    return (
        <RPAModal
            icon={isError ? warning : trash}
            label={isError ? " 문제가 발생했습니다" : "사용자 계정 삭제"}
            description={isError 
                ? ' 요청을 처리하는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.' 
                : `${selectedUsers.length > 1 ? `계정 ${selectedUsers.length}개를` : '이 계정을'} 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
            confirmLoading={isLoading}
            open={isDeleteUserModalOpen}
            onOk={onHandleDeleteUsers}
            onCancel={() => setIsDeleteUserModalOpen(false)}
            centered
            okText={"삭제"}
            cancelText={"취소"}
            footer={(_, { OkBtn, CancelBtn }) => isError ? (
                    <CancelBtn/>
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
