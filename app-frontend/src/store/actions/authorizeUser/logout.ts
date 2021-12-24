export enum LogoutActionType {
  LOGOUT_USER = 'LOGOUT_USER',
}

interface LogoutAction {
  type: LogoutActionType.LOGOUT_USER,
}

export type LogoutActions = LogoutAction;

const logoutUser = (): LogoutAction => ({
  type: LogoutActionType.LOGOUT_USER,
});

export default logoutUser;
