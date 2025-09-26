import { Typography } from "antd"
import changePasswordLogo from "../../../asset/chg-pwd.svg"
import styles from "./RPAChangePasswordHeader.module.scss"
import { useAuthStore } from "../../../stores"

export const RPAChangePasswordHeader = () => {
    const mustChangePw = useAuthStore((state) => state.mustChangePw)

    return (
        <>
            <div className="logo">
                <img
                    src={changePasswordLogo}
                    width={'48px'}
                    height={'48px'}
                    className={styles["image"]}
                    alt=""
                />
            </div>
            <Typography.Title level={1} className="mb-2">비밀번호 변경</Typography.Title>
            {mustChangePw && <Typography.Text className="text-[#717680] text-base">새 비밀번호를 설정해 주세요.</Typography.Text>}
        </>
    )
}
