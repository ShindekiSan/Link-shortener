import { createContext } from "react";

interface contextValue {
	token: null,
	userName: null,
	userId: null,
	login: Function,
	logout: Function,
	isAuthenticated: Boolean
}

function noop() {}

export const AuthContext = createContext<contextValue>({
	token: null,
	userName: null,
	userId: null,
	login: noop,
	logout: noop,
	isAuthenticated: false,
});
