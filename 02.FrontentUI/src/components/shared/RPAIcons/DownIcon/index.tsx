import Icon from "@ant-design/icons";
import { CustomIconComponentProps } from "../RPAIcons.types";

const DownSvg = (color: string = "#A4A7AE") => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.1237 13.1543C10.4037 13.1241 10.6164 12.9961 10.7609 12.8858C10.9068 12.7745 11.0562 12.6222 11.1784 12.5L15.5892 8.08921L15.6462 8.02573C15.9131 7.69842 15.8943 7.21592 15.5892 6.91083C15.2841 6.60573 14.8016 6.5869 14.4743 6.85386L14.4108 6.91083L10 11.3216L5.58921 6.91083C5.26377 6.58539 4.73626 6.58539 4.41083 6.91083C4.08539 7.23626 4.08539 7.76377 4.41083 8.08921L8.82163 12.5C8.94381 12.6222 9.09328 12.7745 9.23911 12.8858C9.40426 13.0118 9.65826 13.1608 10 13.1608L10.1237 13.1543Z" fill={color} />
    </svg>

);

export const DownIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => DownSvg(props.color)} {...props} />
);

