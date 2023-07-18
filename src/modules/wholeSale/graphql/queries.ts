import { gql } from '@apollo/client';

const commonFields = `
  _id
  name
  code

`;
export const getPricingPlans = gql`
  query PricingPlans($status: String) {
    pricingPlans(status: $status) {
      status
      name
      _id
      createdAt
      createdBy
      updatedAt
      updatedBy
      createdUser {
        details {
          fullName
        }
      }
      updatedUser {
        details {
          fullName
        }
      }
      products
      productsBundle
      categories
      isEndDateEnabled
      startDate
      endDate
    }
  }
`;

export const getProducts = gql`
query poscProducts($categoryId: String, $page: Int, $perPage: Int, $searchValue: String, $sortDirection: Int, $sortField: String,$ids: [String]){ 
  poscProducts(categoryId: $categoryId, page: $page, perPage: $perPage, searchValue: $searchValue, sortDirection: $sortDirection, sortField: $sortField,ids: $ids) {
      ${commonFields}
      unitPrice
      remainder
      createdAt
      attachment {
        url
      }
  }
}
`;
