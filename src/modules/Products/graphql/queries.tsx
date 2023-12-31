import { gql } from '@apollo/client';
const commonFields = `
  _id
  name
  code

`;

const productCategories = gql`
query PoscProductCategories($perPage: Int, $excludeEmpty: Boolean, $parentId: String) {
  poscProductCategories(perPage: $perPage, excludeEmpty: $excludeEmpty, parentId: $parentId) {
      ${commonFields}
      meta
      order
      parentId
      isRoot
      productCount
    }
  }
`;

const products = gql`
query poscProducts($categoryId: String, $tag: String, $page: Int, $perPage: Int, $searchValue: String, $sortDirection: Int, $sortField: String){ 
  poscProducts(categoryId: $categoryId, tag: $tag, page: $page, perPage: $perPage, searchValue: $searchValue, sortDirection: $sortDirection, sortField: $sortField) {
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

const productPricingPlans = gql`
  query PricingPlans($status: String, $productId: String, $findOne: Boolean) {
    pricingPlans(status: $status, productId: $productId, findOne: $findOne) {
      _id
      name
      status
      type
      value
      products
      productsBundle
      categories
      startDate
      endDate
      quantityRules {
        type
        value
        discountType
        discountValue
        discountBonusProduct
      }
      priceRules {
        type
        value
        discountType
        discountValue
        discountBonusProduct
      }
    }
  }
`;
const productsCount = gql`
  query productsCount($categoryId: String, $type: String, $searchValue: String) {
    poscProductsTotalCount(categoryId: $categoryId, type: $type, searchValue: $searchValue)
  }
`;

const productDetail = gql`
  query PoscProductDetail($id: String, $branchId: String) {
    poscProductDetail(_id: $id, branchId: $branchId) {
      _id
      attachment {
        url
      }
      attachmentMore {
        url
      }
      category {
        _id
        order
        name
        isRoot
        meta
      }
      categoryId
      code
      createdAt
      customFieldsDataByFieldCode
      description
      name
      remainder
      tagIds
      type
      unitPrice
      vendorId
    }
  }
`;

const wish = gql`
  query Wish($productId: String, $customerId: String) {
    wish(productId: $productId, customerId: $customerId) {
      _id
    }
  }
`;

const wishlist = gql`
  query Wishlist($customerId: String) {
    wishlist(customerId: $customerId) {
      _id
      productId
      customerId
      product {
        _id
        name
        unitPrice
        attachment {
          url
        }
      }
    }
  }
`;

const productDetailWithCustomFields = gql`
  query PoscProducts($categoryId: String) {
    poscProducts(categoryId: $categoryId) {
      customFieldsDataByFieldCode
      _id
    }
  }
`;

const productDetailMeta = gql`
  query PoscProductDetailMeta($id: String) {
    poscProductDetail(_id: $id) {
      name
      customFieldsDataByFieldCode
      categoryId
      attachment {
        url
      }
      _id
    }
  }
`;

const productIds = gql`
  query PoscProductIds {
    poscProducts(perPage: 10000) {
      _id
    }
  }
`;

const remainderCount = gql`
  query poscProductRemainder($id: String, $branchId: String) {
    poscProductDetail(_id: $id, branchId: $branchId) {
      remainder
    }
  }
`;

const getLastProductView = gql`
  query LastViewedItems($customerId: String!, $limit: Int) {
    lastViewedItems(customerId: $customerId, limit: $limit) {
      _id
      productId
      product {
        _id
        createdAt
        attachment {
          url
        }
        unitPrice
        name
      }
    }
  }
`;

const getProductReviews = gql`
  query Productreviews($productIds: [String], $customerId: String) {
    productreviews(productIds: $productIds, customerId: $customerId) {
      _id
      customerId
      review
    }
  }
`;

const getProductAverageReview = gql`
  query Productreview($productId: String!) {
    productreview(productId: $productId) {
      average
      length
      productId
    }
  }
`;

const queries = {
  remainderCount,
  productCategories,
  products,
  productsCount,
  productDetail,
  wish,
  wishlist,
  productDetailWithCustomFields,
  productIds,
  productPricingPlans,
  productDetailMeta,
  getLastProductView,
  getProductAverageReview,
  getProductReviews,
};

export default queries;
