import { gql } from "@apollo/client";

export const ADD_REVIEWS_MUTATION = gql`
mutation AddRating($addReviewsInput: AddReviewsInput!){
  addReviews(addReviewsInput: $addReviewsInput){
    rating
    comment
    clientName
    artwork{
      id
      title
    }
    customer{
      id
      fullName
    }
  }
}
`

export const GET_REVIEWS = gql`
query Get_Reviews{
  getReviews{
    id
    rating
    comment
    clientName
    isActive
    customer{
      fullName
    }
    artwork{
      id
      title
    }
  }
}
`