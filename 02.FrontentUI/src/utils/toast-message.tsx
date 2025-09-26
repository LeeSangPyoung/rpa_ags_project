import { NotificationInstance } from "antd/lib/notification/interface";

type statusType = "success" | "error" | "warning" | "info";

export const toastMessage = (api: NotificationInstance, status: statusType, message: string, description?: string, duration: number = 3) => {
    switch (status) {
        case "success":
            api.success({
                message: <div className="font-semibold">{message}</div>,
                description: description ? `${description}` : '',
                duration: duration,
                placement: "top",
                style: {
                    width: '654px',
                },
                className: "bg-[#ECFDF3] p-3 rounded-lg"
            })
            break;

        case "error":
            api.error({
                message: <div className="font-semibold">{message}</div>,
                description: description ? `${description}` : '',
                duration: duration,
                placement: "top",
                style: {
                    width: '654px',
                },
                className: "bg-[#FEF3F2] p-3 rounded-lg"
            })
            break;

        default:
            api.info({
                message: <div className="font-semibold">{message}</div>,
                description: description ? `${description}` : '',
                duration: duration,
                placement: "top",
                style: {
                    width: '654px',
                },
                className: "bg-[#ECFDF3] p-3 rounded-lg"
            })
            break;
    }


}