import { Flex, Typography } from "antd"
import { RPATabHeaderProps } from "./RPATabHeader.types"
import { useAuthStore } from "../../../stores"
import { GUEST_USER } from "../../../constants/auth-roles"

export const RPATabHeader = ({ title, actionButton }: RPATabHeaderProps) => {
    const userRoles = useAuthStore((state) => state.roles)

    const isGuestUser = userRoles.some((role) => GUEST_USER.includes(role))
    return (
        <Flex justify="space-between">
            <Typography.Title level={5}>{title}</Typography.Title>
            {!isGuestUser &&
                <div className="flex space-x-2">
                    {actionButton}
                </div>
            }
        </Flex>
    )
}
