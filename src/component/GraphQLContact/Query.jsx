import { gql } from "@apollo/client";

export const GET_USER = gql`
  query MyQuery($_eq: String!) {
    users(where: { id: { _eq: $_eq } }) {
      id
      name
      picture
    }
  }
`;

export const SEARCH_USER = gql`
  query MyQuery($_ilike: String!) {
    users(where: { name: { _ilike: $_ilike } }) {
      id
      email
      name
      picture
    }
  }
`;


export const SEARCH_GROUP = gql`
query MyQuery($_ilike: String!) {
  groups(where: {name: {_ilike: $_ilike}}) {
    id
    name
    picture
    ownerId
  }
}

`