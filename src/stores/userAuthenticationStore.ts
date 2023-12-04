import { UserAuthentication } from "@/models/UserModel";
import { create } from "zustand";

interface IUserAuthenticationStore {
  user: UserAuthentication;
  updateUser: (by: UserAuthentication) => void;
}


export const useUserAuthenticationStore = create<IUserAuthenticationStore>((set) => ({
  user: {} as UserAuthentication,
  updateUser: (by) => set(_ => ({ user: by })),
}))