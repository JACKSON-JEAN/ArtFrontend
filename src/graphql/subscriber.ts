import { gql } from "@apollo/client";

export const ADD_SUBSCRIBER_MUTATION = gql`
mutation AddSubscriber($addSubscriberInput: AddSubscriberInput!) {
  addSubscriber(addSubscriberInput: $addSubscriberInput){
    id
    email,
    status
  }
}
`