import { Flex, Form, FormProps, notification, Row, Typography } from "antd"
import { RPARegisterForm, RPARegisterHeader } from "../../../components"
import thumbnailRegister from "../../../asset/thumbnail.png";
import { RegisterRequestType } from "../../../types";
import { useAuthStore } from "../../../stores";
import { MessageResponse } from "../../../constants/message";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../../constants/constants";
import { toastMessage } from "../../../utils/toast-message";


export const Register: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const register = useAuthStore((state) => state.register)
    const isLoading = useAuthStore((state) => state.isLoading)
    const setIsRegisterSuccess = useAuthStore((state) => state.setIsRegisterSuccess)
    const [api, contextHolder] = notification.useNotification();

    
    const onFinish: FormProps<RegisterRequestType>["onFinish"] = async (values) => {
        const userId = values.userId;
        const userName = values.userName;
        const email = values.email;
        const phoneNumber = values.phoneNumber;
        const roleId = values.roleId;
        const password = values.password
        try {
            await register({ userId, userName, password, email, phoneNumber, roleId });
            setIsRegisterSuccess(true)
            navigate(LOGIN_ROUTE)
            debugger
        } catch (error: any) {
            if (error?.messageId==='E011') {
                toastMessage(api, "error", "계정 등록에 실패했습니다.", "계정 등록 중 오류가 발생했습니다. 다시 시도하거나 관리자에게 문의하세요.")
            } else {
                toastMessage(api, "error", MessageResponse[error?.messageId]);
            }
        }
    };


    return (
        <>
            {contextHolder}
            <Row className="h-screen w-screen">
                <Flex
                    className="h-full w-1/2"
                    justify="center"
                >
                    <Flex
                        vertical
                        gap={40}
                        className="h-full w-1/2"
                        justify="center"
                    >
                        <RPARegisterHeader />
                        <div>
                            <RPARegisterForm form={form} onFinish={onFinish} />
                            <div className="flex mt-6 justify-center">
                                <Typography.Text >
                                    이미 계정이 있으신가요?
                                    <Typography.Link color="#463DC8" className="font-semibold" href="/login" disabled={isLoading}> 로그인하기</Typography.Link>
                                </Typography.Text>
                            </div>
                        </div>

                    </Flex>

                </Flex>
                <div className="h-screen w-1/2">
                    <img src={thumbnailRegister} className="w-full h-full object-cover" alt="" />
                </div>
            </Row>
        </>
    )
}
