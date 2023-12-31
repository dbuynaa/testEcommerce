import { gql } from '@apollo/client';

const addEditParamDefs = `$items: [OrderItemInput], $totalAmount: Float!, $type: String!, $customerId: String, $slotCode: String, $registerNumber: String, $billType: String, $origin: String, $deliveryInfo: JSON, $branchId: String, $buttonType: String`;
const addEditParams = `items: $items, totalAmount: $totalAmount, type: $type, customerId: $customerId, slotCode: $slotCode, registerNumber: $registerNumber, billType: $billType, origin: $origin, deliveryInfo: $deliveryInfo, branchId: $branchId,  buttonType: $buttonType`;

const ordersAdd = gql`
  mutation ordersAdd(${addEditParamDefs}) {
    ordersAdd(${addEditParams}) {
     _id
    }
  }
`;

const ordersEdit = gql`
  mutation ordersEdit($_id: String!, ${addEditParamDefs}) {
    ordersEdit(_id: $_id, ${addEditParams}) {
      _id,
      status
    }
  }
`;

const ordersAddPayment = gql`
  mutation ordersAddPayment($_id: String!, $mobileAmount: Float) {
    ordersAddPayment(_id: $_id, mobileAmount: $mobileAmount) {
      _id
    }
  }
`;

const orderChangeStatus = gql`
  mutation orderChangeStatus($_id: String!, $status: String) {
    orderChangeStatus(_id: $_id, status: $status) {
      _id
    }
  }
`;

const ordersMakePayment = gql`
  mutation OrdersMakePayment($id: String!, $doc: OrderPaymentInput) {
    ordersMakePayment(_id: $id, doc: $doc) {
      amount
      billId
    }
  }
`;

const orderItemChangeStatus = gql`
  mutation orderItemChangeStatus($_id: String!, $status: String) {
    orderItemChangeStatus(_id: $_id, status: $status) {
      _id
      status
    }
  }
`;

const generateInvoiceUrl = gql`
  mutation GenerateInvoiceUrl(
    $amount: Float!
    $contentType: String
    $contentTypeId: String
    $customerId: String
    $customerType: String
    $description: String
    $email: String
    $paymentIds: [String]
    $phone: String
  ) {
    generateInvoiceUrl(
      amount: $amount
      contentType: $contentType
      contentTypeId: $contentTypeId
      customerId: $customerId
      customerType: $customerType
      description: $description
      email: $email
      paymentIds: $paymentIds
      phone: $phone
    )
  }
`;

const ordersCancel = gql`
  mutation OrdersCancel($id: String!) {
    ordersCancel(_id: $id)
  }
`;

const afterFormSubmit = gql`
  mutation AfterFormSubmit($id: String!, $conversationId: String!) {
    afterFormSubmit(_id: $id, conversationId: $conversationId) {
      _id
    }
  }
`;

const ordersSettlePayment = gql`
  mutation ordersSettlePayment(
    $_id: String!
    $billType: String!
    $registerNumber: String
  ) {
    ordersSettlePayment(
      _id: $_id
      billType: $billType
      registerNumber: $registerNumber
    ) {
      success
      lotteryWarningMsg
      errorCode
      message
      getInformation
    }
  }
`;

const mutations = {
  ordersAdd,
  ordersEdit,
  ordersAddPayment,
  ordersMakePayment,
  orderChangeStatus,
  orderItemChangeStatus,
  generateInvoiceUrl,
  ordersCancel,
  afterFormSubmit,
  ordersSettlePayment,
};

export default mutations;
