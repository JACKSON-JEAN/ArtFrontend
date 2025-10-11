import { gql } from "@apollo/client";

// ---------- QUERIES ----------
export const GET_CLIENT_CART = gql`
  query getClientCart($clientId: Float!) {
  getClientCart(clientId: $clientId){
    id
    totalAmount
    customer{
      fullName
      email
    }
    items{
      id
      quantity
      price
      artworkId
      artwork{
        id
        title
        imageHash
        heightCm
        widthCm
        category
        material
        media{
          id
          url
        }
      }
    }
  }
}
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems($clientId: Float!) {
    getCartItems(clientId: $clientId) {
      id
      quantity
      price
      artwork {
        id
        image
        imageHash
        title
        heightCm
        widthCm
      }
    }
  }
`;

// ---------- MUTATIONS ----------
export const ADD_CART_ITEM = gql`
  mutation AddCartItem($addItemInput: AddCartItemInput!, $clientId: Float!) {
    addCartItem(addItemInput: $addItemInput, clientId: $clientId) {
      id
      quantity
      price
    }
  }
`;

export const INCREMENT_ITEM = gql`
  mutation IncrementCartItem($itemId: Float!, $clientId: Float!) {
    cartItemIncrement(itemId: $itemId, clientId: $clientId) {
      id
      quantity
    }
  }
`;

export const DECREMENT_ITEM = gql`
  mutation DecrementCartItem($itemId: Float!, $clientId: Float!) {
    cartItemDecrement(itemId: $itemId, clientId: $clientId) {
      id
      quantity
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteCartItem($itemId: Float!, $clientId: Float!) {
    deleteCartItem(itemId: $itemId, clientId: $clientId)
  }
`;
