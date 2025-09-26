
// Base URL API
export const BASE_URL = process.env.REACT_APP_API_URL;

export const DEFAULT_PAGE_SIZE = 15;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,200}$/
export const DEFAULT_PASSWORD = "Skax1q2w3e4r%T";


//routes
export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const SCHEDULE_MANAGEMENT = '/';
export const CHANGE_PASSWORD_ROUTE = '/change-password';
export const REGISTER_ROUTE = '/register';
export const ACTION_SCHEDULING = '/schedule';
export const ACTION_DETAIL = '/action/:actionName';
export const USER_MANAGEMENT = '/user';
export const EXECUTION_HISTORY = '/history';
export const ACCOUNT_GROUP = '/account-group';

//web-socket
export const WS_ENDPOINT = "http://localhost:8080/ws-action";
export const TOPIC = "/topic/action-change";
