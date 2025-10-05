import { gql } from "@apollo/client";

export const SEND_MESSAGE_MUTATION = gql`
mutation SendMessage($messageInput: AddMessageInput!){
  sendMessage(messageInput: $messageInput){
    id
    fullName
    email
    message
    status
    createdAt
  }
}
`