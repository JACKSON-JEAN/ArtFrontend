import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
mutation SignUp($signUpData: AddUserInput!) {
  signUp(signUpData: $signUpData) {
    id
    email
    role
    isActive
  }
}`

export const SIGN_IN_MUTATION = gql`
mutation SignIn($signInData: SigInInput!){
  signIn(signInData: $signInData) {
    accessToken,
    refreshToken
  }
}
`
export const LOGOUT_MUTATION = gql`
mutation Logout($refreshToken: String!) {
  logout(refreshToken: $refreshToken){
    message
  }
}
`