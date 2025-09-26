import Icon from "@ant-design/icons";
import { CustomIconComponentProps } from "../RPAIcons.types";

const SearchSvg = (color: string = "#A4A7AE") => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.9697 16.9697C17.2626 16.6768 17.7374 16.6768 18.0303 16.9697L22.5303 21.4697L22.582 21.5264C22.8223 21.8209 22.8049 22.2557 22.5303 22.5303C22.2557 22.8049 21.8209 22.8223 21.5264 22.582L21.4697 22.5303L16.9697 18.0303C16.6768 17.7374 16.6768 17.2626 16.9697 16.9697Z" fill={color} />
        <path d="M19.25 11C19.25 6.44365 15.5563 2.75 11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 15.5563 6.44365 19.25 11 19.25C15.5563 19.25 19.25 15.5563 19.25 11ZM20.75 11C20.75 16.3848 16.3848 20.75 11 20.75C5.61522 20.75 1.25 16.3848 1.25 11C1.25 5.61522 5.61522 1.25 11 1.25C16.3848 1.25 20.75 5.61522 20.75 11Z" fill={color} />
    </svg>

);

export const SearchIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => SearchSvg(props.color)} {...props} />
);
