import { Form, Input, Modal, Select, Typography } from 'antd'
import { RPAEditUserModalProps } from './RPAEditUserModal.types'
import { useUserStore } from '../../../stores/useUserStore'
import { useRoleOptions } from '../../../hooks/useCombobox' 
import { useEffect } from 'react'

export const RPAEditUserModal = ({ isModalOpen, isEditUserModalOpen, userInfoSelected, editUserForm, setIsEditUserModalOpen, onCloseEditUserModal, onEditUserFinish }: RPAEditUserModalProps) => {

  const isLoading = useUserStore((state) => state.isLoading)
  const { roleOptions, roleLoading} = useRoleOptions();

  useEffect(() => {
    if (!isEditUserModalOpen) {
      editUserForm.resetFields();
    }
  }, [isEditUserModalOpen, editUserForm]);

  return (
    <Modal
      title={<div className='pb-4 text-lg text-button-secondary-fg'>사용자 편집</div>}
      closable={{ 'aria-label': 'Custom Close Button' }}
      className='py-4 px-4'
      open={isModalOpen}
      onOk={isEditUserModalOpen ? () => {
        editUserForm.submit()
      } : () => {
        setIsEditUserModalOpen(true)
      }}
      onCancel={onCloseEditUserModal}
      centered
      okText={isEditUserModalOpen ? '저장' : '편집'}
      footer={(_, { OkBtn, CancelBtn }) =>
        isEditUserModalOpen ? <div className='flex gap-4 pt-4'>
          <CancelBtn />
          <OkBtn />
        </div>
          : <div className='pt-4'><OkBtn /></div>
      }

      okButtonProps={{
        type: isEditUserModalOpen ? 'primary' : 'default',
        className: `${isEditUserModalOpen ? 'w-1/2' : 'w-full'} font-semibold text-base h-[44px]`
      }}
      cancelButtonProps={{
        className: "w-1/2 font-semibold text-base h-[44px]"
      }}
    >
      <>
        {!isEditUserModalOpen ?
          <div className='py-3'>
            <div className='flex justify-between mb-1 py-2'>
              <Typography.Text className='font-normal text-[#717680]'>이름</Typography.Text>
              <Typography.Text className='font-medium text-[#414651]'>{userInfoSelected?.userName}</Typography.Text>
            </div>
            <div className='flex justify-between mb-1 py-2'>
              <Typography.Text className='font-normal text-[#717680]'>ID</Typography.Text>
              <Typography.Text className='font-medium text-[#414651]'>{userInfoSelected?.userId}</Typography.Text>
            </div>
            <div className='flex justify-between mb-1 py-2'>
              <Typography.Text className='font-normal text-[#717680]'>전화번호</Typography.Text>
              <Typography.Text className='font-medium text-[#414651]'>{userInfoSelected?.phoneNumber}</Typography.Text>
            </div>
            <div className='flex justify-between mb-1 py-2'>
              <Typography.Text className='font-normal text-[#717680]'>역할</Typography.Text>
              <Typography.Text className='font-medium text-[#414651]'>{userInfoSelected?.roleId === 1 ? "관리자" : (userInfoSelected?.roleId === 2 ? "일반 사용자" : "게스트")}</Typography.Text>
            </div>
            <div className='flex justify-between mb-1 py-2'>
              <Typography.Text className='font-normal text-[#717680]' style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>이메일</Typography.Text>
              <Typography.Text className='font-medium text-[#414651]' style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{userInfoSelected?.email}</Typography.Text>
            </div>
          </div> :
          <Form form={editUserForm} layout="vertical" requiredMark={false} onFinish={onEditUserFinish}>
            <Form.Item
              label="이름"
              name="userName"
              rules={[
                {
                  min: 6,
                  max: 50,
                  message: "사용자 이름을 6자에서 50자 사이로 입력해 주세요.",
                },
              ]}
            >
              <Input defaultValue={userInfoSelected?.userName} placeholder="이름 입력" disabled={isLoading} />
            </Form.Item>

            <div className="flex justify-between">
              <Form.Item
                label={
                  <span>
                    ID
                    <span className='text-red-600 ml-1'>*</span>
                  </span>
                }
                name="userId"
                className="w-1/2 mr-[6px]"
                rules={[
                  {
                    required: true,
                    message: "ID를 입력해주세요!",
                  },
                  {
                    min: 6,
                    max: 50,
                    message: "ID를 6자에서 50자 사이로 입력해 주세요."
                  }
                ]}
              >
                <Input defaultValue={userInfoSelected?.userId} placeholder="ID 입력" readOnly />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    전화번호
                    <span className = "text-red-700 ml-1">*</span>
                  </span>
                }

                name="phoneNumber"
                className="w-1/2 ml-[6px]"
                validateFirst
                rules={[
                  {
                    required: true,
                    message: "전화번호를 입력해 주세요.",
                  },

                  () => ({
                    validator(_, value) {
                      if (/^\d{11}$/.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject("전화번호는 숫자여야 하며 11자리여야 합니다.");
                    },
                  }),
                ]}
              >
                <Input defaultValue={userInfoSelected?.phoneNumber} placeholder="전화번호 입력" disabled={isLoading} />
              </Form.Item>
            </div>


            <Form.Item
              label={
                <span>
                  역할
                  <span className = "text-red-700 ml-1">*</span>
                </span>
              }

              name="roleId"
              rules={[
                {
                  required: true,
                  message: "역할을 선택해 주세요.",
                },
              ]}
            >
              <Select
                placeholder="역할 선택"
                options={roleOptions}
                defaultValue={userInfoSelected?.roleId}
                disabled={roleLoading}
                className="h-10"
              ></Select>
            </Form.Item>

            <Form.Item
              label={
                <span>
                  이메일
                  <span className = "text-red-700 ml-1">*</span>
                </span>
              }

              name="email"
              rules={[
                {
                  type: "email",
                  message: "입력하신 이메일 형식이 올바르지 않습니다.",
                },
                {
                  max: 140,
                  message: "이메일은 140자 이내여야 합니다."
                },
                {
                  required: true,
                  message: "이메일을 입력해 주세요.",
                },
              ]}
            >
              <Input defaultValue={userInfoSelected?.email} placeholder="이메일 주소 입력" disabled={isLoading} maxLength={140} />
            </Form.Item>
          </Form>}

      </>

    </Modal>
  )
}
