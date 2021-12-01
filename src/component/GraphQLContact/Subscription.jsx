import { gql } from "@apollo/client";

export const GET_USERS = gql`
  subscription MyQuery {
    contacts(order_by: { user: { name: asc } }) {
      contact {
        id
        name
        picture
        email
        type
      }
      id
    }
  }
`;

export const GET_GROUPS = gql`
  subscription MyQuery($_eq1: String!) {
    groups(
      where: { groupLists: { userId: { _eq: $_eq1 } } }
      order_by: { name: asc }
    ) {
      id
      name
      picture
      type
    }
  }
`;

export const GET_OWNED_GROUP = gql`
subscription MyQuery($_eq: String = "") {
  groups(where: {ownerId: {_eq: $_eq}}) {
    id
    name
    ownerId
    picture
    type
  }
}

`;