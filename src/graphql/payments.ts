import { gql } from "@apollo/client";

export const INITIATE_PAYMENT = gql`
  mutation InitiatePayment($orderId: Float!) {
    initiatePayment(orderId: $orderId) {
      orderTrackingId
      paymentRedirectUrl
    }
  }
`;

export const HANDLE_PAYMENT_CALLBACK = gql`
  mutation HandlePaymentCallback($input: PesapalCallbackInput!) {
    handlePaymentCallback(input: $input) {
      success
      orderStatus
      paymentMethod
      message
      amount
      currency
      reference
    }
  }
`;

export const CHECK_PAYMENT_STATUS = gql`
  query CheckPaymentStatus($orderId: Int!) {
    checkPaymentStatus(orderId: $orderId) {
      paymentMethod
      status
      message
      amount
      currency
      reference
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation Add_Order($customerId: Float!, $addOrderInput: AddOrderInput!) {
    addOrder(customerId: $customerId, addOrderInput: $addOrderInput) {
      id
      totalAmount
      status
    }
  }
`;

export const ADD_ORDER_INPUT = gql`
  input AddOrderInput {
    shippingAddressId: Int
    totalAmount: Float!
    status: OrderStatus
  }
`;

export const INITIATE_DPO_PAYMENT = gql`
  mutation InitiateDPOPayment($orderId: Float!) {
    initiateDPOPayment(orderId: $orderId) {
      orderTrackingId
      paymentRedirectUrl
    }
  }
`;

export const INITIATE_PESAPAL_PAYMENT = gql`
  mutation InitiatePesapalPayment($orderId: Float!) {
  initiatePesapalPayment(orderId: $orderId) {
    redirectUrl
  }
}
`;

export const GET_CLIENT_PAYMENT_REPORT = gql`
query GetClientPaymentReport($trackingId: String!){
  getClientPaymentReport(trackingId: $trackingId){
    id
    status
    transactionId
    paymentMethod
    amount
    currency
    createdAt
    order{
      id
      items{
        price
        quantity
        artwork{
          id
          title
          price
        }
      }
    }
  }
}
`

export const CREATE_STRIPE_CHECKOUT_SESSION = gql`
 mutation CreateStripeCheckoutSession($orderId: Float!){
  createStripeCheckoutSession(orderId: $orderId){
    sessionUrl
  }
}
`;