import { atom } from "recoil";

type AuthState = {
  isOpen: boolean;
  type: "login" | "register" | "forgotPassword";
};

const initialAuthState: AuthState = {
  isOpen: false,
  type: "login",
};

export const authModelState = atom<AuthState>({
  key: "authModelState",
  default: initialAuthState,
});
