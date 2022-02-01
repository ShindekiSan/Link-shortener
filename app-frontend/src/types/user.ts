export interface UserInterface {
  userId: string,
  email?: string,
  userName: string,
  token: string,
  password?: string,
}

export interface LoginData {
  email: string,
  password: string,
}

export interface SignupData {
  email: string,
  username: string,
  password: string,
}

export interface UserData {
  data?: UserInterface
}
