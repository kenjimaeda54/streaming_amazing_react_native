

export interface UserAuthentication {
  idToken: string | null
  user: UserModel
}

export interface UserModel {
  photo: string | null
  givenName: string | null
  email: string
}