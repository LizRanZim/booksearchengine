// Using lesson 21-25 as base code for this

import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
      savedBooks
    }
  }
`;

// Below are not required, just potentially helpful
export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      password
      savedBooks
    }
  }
`;

export const QUERY_BOOKS = gql`
  query books {
    books {
      _id
      bookID
      title
      authors
      description
      image
      link
    }
  }
`;