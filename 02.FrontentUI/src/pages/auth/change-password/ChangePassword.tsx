import React, { useEffect } from 'react'
import bgDecoration from "../../../asset/bg-decoration.svg"
import { ChangePasswordFieldType, RPAChangePasswordForm, RPAChangePasswordHeader } from '../../../components';
import { Form, FormProps } from 'antd';
import { useAuthStore } from '../../../stores';
import { useNavigate } from 'react-router-dom';
import { MessageResponse } from '../../../constants/message';
import { LOGIN_ROUTE } from '../../../constants/constants';
import { AUTH_USER } from '../../../constants/auth-roles';

export const ChangePassword: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const changePassword = useAuthStore((state) => state.changePassword)
  const setMustChangePw = useAuthStore((state) => state.setMustChangePw)
  const setIsChangePwSuccess = useAuthStore((state) => state.setIsChangePwSuccess)
  const userRoles = useAuthStore((state) => state.roles)
  const hasAccess = userRoles.some((role) => AUTH_USER.includes(role));

  useEffect(() => {
    if (!hasAccess) {
      navigate(LOGIN_ROUTE)
    }
  }, [hasAccess, navigate])


  const onFinish: FormProps<ChangePasswordFieldType>["onFinish"] = async (values) => {
    const oldPassword = values.oldPassword;
    const newPassword = values.newPassword
    try {
      await changePassword({ oldPassword, newPassword });
      setMustChangePw(0)
      setIsChangePwSuccess(true)
      navigate(LOGIN_ROUTE)

    } catch (error: any) {
      form.setFields([{
        name: "oldPassword",
        errors: [MessageResponse[error?.messageId]],
      }])
    }

  }

  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 h-4/5 m-auto relative z-0">
        <img
          src={bgDecoration}
          alt=""
          className="absolute z-10 top-[-3.25rem] left-[1.875rem]"
        />
        <div className="w-1/2 m-auto relative z-20">
          <div className='mb-10'>

            <RPAChangePasswordHeader />
          </div>

          <RPAChangePasswordForm form={form} onFinish={onFinish} />
        </div>
      </div>
    </div>
  );

}
