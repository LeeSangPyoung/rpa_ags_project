import Icon from "@ant-design/icons";
import { GetProps } from "antd";

export type CustomIconComponentProps = Omit<GetProps<typeof Icon>, "color"> & {
    color?: string,
};