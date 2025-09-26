import Icon from "@ant-design/icons";
import { CustomIconComponentProps } from "../RPAIcons.types";

const AddSvg = (color: string = "white") => (
    <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const AddIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => AddSvg(props.color)} {...props} />
);
