import { Button } from "antd";
import { RPAButtonProps } from "./RPAButton.types";

export const RPAButton = ({ label, ...props }: RPAButtonProps) => {
  return (
    <Button {...props}>{label}</Button>
  )
}
