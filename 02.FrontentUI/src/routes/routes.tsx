import { createBrowserRouter } from "react-router-dom";
import { EXECUTION_HISTORY, ACTION_DETAIL, CHANGE_PASSWORD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, USER_MANAGEMENT, ACCOUNT_GROUP } from "../constants/constants";
import { MainLayout } from "../layouts/main/MainLayout";
import { NotFound } from "../pages/not-found/NotFound";
import { PrivateRoute } from "./private-route";
import { Login, ChangePassword, Register, ScheduleManagement, UserManagement, ActionDetail, ExecutionHistory, AccountGroupManagement } from "../pages";
import { AUTH_USER } from "../constants/auth-roles";

export const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <PrivateRoute allowedRoles={AUTH_USER} />,
        children: [{
          index: true,
          element: <ScheduleManagement />
        },
        {
          path: USER_MANAGEMENT,
          element: <UserManagement />
        },
        {
          path: ACTION_DETAIL,
          element: <ActionDetail />
        },
        {
          path: EXECUTION_HISTORY,
          element: <ExecutionHistory />
        },
        {
          path: ACCOUNT_GROUP,
          element: <AccountGroupManagement />
        },
      ]
      }
    ]
  },
  {
    path: LOGIN_ROUTE,
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: REGISTER_ROUTE,
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: CHANGE_PASSWORD_ROUTE,
    errorElement: <NotFound />,
    element: <ChangePassword />
  },
]);

