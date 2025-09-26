import { Modal, ModalProps } from "antd"
import { RPAModalProps } from "./RPAModal.types"
import successIcon from "../../../asset/success.svg"
import infoIcon from "../../../asset/info.svg"
import warningIcon from "../../../asset/warning.svg"
import errorIcon from "../../../asset/error.svg"

type RPAModalType = RPAModalProps & ModalProps
export const RPAModal = ({ type, icon, label, description, ...props }: RPAModalType) => {

    const typeModal = () => {
        switch (type) {
            case "success":
                return successIcon
            case "warning":
                return warningIcon
            case "error":
                return errorIcon
            default:
                return infoIcon;
        }
    }

    return (
        <>
            <Modal closable={{ "aria-label": "Custom Close Button" }} {...props}>
                <img src={icon ? icon : typeModal()} alt="" />
                <h1 className="text-lg font-semibold mb-2 mt-5">{label}</h1>
                <p className="mb-10 text-base">
                    {description}
                </p>
            </Modal>
        </>
    )


}
