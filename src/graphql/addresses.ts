import { gql } from "@apollo/client";

export const GET_ADDRESSES_BY_CUSTOMER_ID=gql`
query GetAddressesByCustomerId($customerId: Float!){
  getAddressesByCustomerId(customerId: $customerId){
    id
    fullName
    phone
    email
    line1
    line2
    city
    state
    country
    postalCode
    isDefault
  }
}
`

export const GET_ADDRESS_BYID=gql`
query GetAddressById($addressId: Float!){
  getAddressById(addressId: $addressId){
    id
    fullName
    phone
    country
    state
    city
    line1
  }
}
`

export const ADD_ADDRESS_MUTATION=gql`
mutation AddAddress($addAddressInput: AddAddressInput!){
  addAddress(addAddressInput: $addAddressInput){
    id
    fullName
    phone
    email
    line1
    line2
    city
    state
    country
    postalCode
    isDefault
    customer{
      fullName
    }
    orders{
      id
    }
  }
}
`

export const EDIT_ADDRESS_MUTATION=gql`
mutation UpdateAddress($addressId: Float!, $updateAddressInput: UpdateAddressInput!){
  updateAddress(addressId: $addressId, updateAddressInput: $updateAddressInput){
    id
    fullName
    country
    state,
    city
    line1
  }
}
`