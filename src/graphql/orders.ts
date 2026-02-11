import { gql } from "@apollo/client";

export const GET_ORDERS_QUERY=gql`
query GetOrders($searchInput: SearchOrdersInput!){
  getOrders(searchInput: $searchInput){
    id
    items{
      id
      price
      quantity
      artwork{
        id
        title
      }
    }
    shippingAddress{
      fullName
      phone
      email
      line1
      line2
      postalCode
      city
      state
      country
    }
    customer{
      fullName
    }
    status
  }
}
`
export const GET_ADMIN_ORDERS_QUERY=gql`
query GetOrders($searchInput: SearchOrdersInput!){
  getAdminOrders(searchInput: $searchInput){
    id
    items{
      id
      price
      quantity
      artwork{
        id
        title
      }
    }
    shippingAddress{
      fullName
      phone
      email
      line1
      line2
      postalCode
      city
      state
      country
    }
    customer{
      fullName
    }
    status
  }
}
`