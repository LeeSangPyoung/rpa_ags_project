import { Form, FormProps, notification, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgDecoration from "../../../asset/bg-decoration.svg";
import thumbnailLogin from "../../../asset/thumbnail.png";
import {
  RPALoginForm,
} from "../../../components/RPALogin/RPALoginForm";
import { RPALoginHeader } from "../../../components/RPALogin/RPALoginHeader/RPALoginHeader";
import { MessageResponse } from "../../../constants/message";
import { useAuthStore } from "../../../stores";
import { LoginRequestType, LoginResponseType } from "../../../types";
import { ApiResponse } from "../../../types/api";
import { HOME_ROUTE, REGISTER_ROUTE } from "../../../constants/constants";
import { toastMessage } from "../../../utils/toast-message";


export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();

  const login = useAuthStore(state => state.login)
  const resetData = useAuthStore(state => state.resetData)
  const isLoading = useAuthStore(state => state.isLoading)
  const isRegisterSuccess = useAuthStore(state => state.isRegisterSuccess)
  const isChangePwSuccess = useAuthStore(state => state.isChangePwSuccess)
  const setIsRegisterSuccess = useAuthStore(state => state.setIsRegisterSuccess)
  const setIsChangePwSuccess = useAuthStore(state => state.setIsChangePwSuccess)

  useEffect(() => {
    resetData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if (isRegisterSuccess) {
      toastMessage(api, "success", "계정 등록 요청 완료.", "계정 등록 요청이 송부되었으며 관리자 승인을 기다리고 있습니다.")
      setIsRegisterSuccess(false)
    }
    if (isChangePwSuccess) {
      toastMessage(api, "success", "비밀번호가 성공적으로 변경되었습니다.", "이제 새 비밀번호로 시스템에 로그인할 수 있습니다.")
      setIsChangePwSuccess(false)
    }

  }, [isRegisterSuccess, isChangePwSuccess, api, setIsRegisterSuccess, setIsChangePwSuccess])

  const handleErrorMessage = (res: ApiResponse<LoginResponseType> | undefined) => {
    switch (res?.messageId) {
      case "E020":
        setErrorMessage(MessageResponse["LE002"]);
        break;

      default:
        setErrorMessage(MessageResponse["LE001"]);
        break;

    }
  }

  const onFinish: FormProps<LoginRequestType>["onFinish"] = async (values) => {
    const userId = values.userId;
    const password = values.password
    try {
      await login({ userId, password });

      navigate(HOME_ROUTE)
    } catch (error: any) {
      if (error?.status === 200) {
        setIsError(true)
        handleErrorMessage(error)
      } else {
        toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
      }
    }

  }

  return (
    <>
      {contextHolder}
      <div className="w-screen h-screen flex">
        <div className="w-1/2 m-auto relative z-0">
          <img
            src={bgDecoration}
            alt=""
            className="absolute z-10 top-[-3.25rem] left-[1.875rem]"
          />
          <div className="w-1/2 m-auto relative z-20">
            <div className="mb-10">
              <RPALoginHeader />
            </div>

            <RPALoginForm
              form={form}
              isError={isError}
              errorMessage={errorMessage}
              onFinish={onFinish}
            />
            <div className="flex mt-6 justify-center">
              <Typography.Text >
                계정이 없으신가요?
                <Typography.Link href={REGISTER_ROUTE} color="#463DC8" className="font-semibold" disabled={isLoading}> 가입하기</Typography.Link>
              </Typography.Text>
            </div>
          </div>
        </div>
        <div className="h-screen w-1/2">
          <img src={thumbnailLogin} className="w-full h-full object-cover" alt="" />
        </div>
      </div>
    </>
  );
};
