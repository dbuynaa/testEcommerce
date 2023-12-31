import { gql } from '@apollo/client';
import { featuredImage } from './posts';

export const LOGIN = gql`
  query LOGIN {
    pageBy(uri: "login") {
      ${featuredImage()}
    }
  }
`;

export const FOOTER = gql`
  query FOOTER {
    pageBy(uri: "footer") {
      ${featuredImage()}
      content
      contact {
        mail
        map
        phone
        facebook
        instagram
      }
    }
  }
`;

export const TERMS_OF_USE = gql`
  query TERMS_OF_USE {
    pageBy(uri: "terms-of-use") {
      content
    }
  }
`;

export const ABOUT = gql`
  query TERMS_OF_USE {
    pageBy(uri: "about") {
      ${featuredImage()}
      content
    }
  }
`;
