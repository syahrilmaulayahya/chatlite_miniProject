import { gql } from "@apollo/client";

export const DELETE_CONTACT = gql`
  mutation MyMutation($_eq: uuid!) {
    delete_contacts(where: { id: { _eq: $_eq } }) {
      affected_rows
    }
  }
`;

export const LEAVE_GROUP = gql`
  mutation MyMutation($_eq: uuid = "", $_eq1: String = "") {
    delete_groupLists(
      where: { _and: { groupId: { _eq: $_eq }, userId: { _eq: $_eq1 } } }
    ) {
      affected_rows
      returning {
        groupId
        id
        userId
      }
    }
  }
`;

export const INSERT_CONTACT = gql`
  mutation MyMutation($contactId: String!, $userId: String!) {
    insert_contacts(objects: { contactId: $contactId, userId: $userId }) {
      returning {
        id
        user {
          id
        }
      }
      affected_rows
    }
  }
`;

export const JOIN_GROUP = gql`
mutation MyMutation($groupId: uuid!, $userId: String!) {
  insert_groupLists(objects: { groupId: $groupId, userId: $userId }) {
    returning {
      id
      groupId
      userId
    }
  }
}
`;

export const CREATE_GROUP = gql`
mutation MyMutation($name: String = "", $ownerId: String) {
  insert_groups(objects: {name: $name, ownerId: $ownerId}) {
    returning {
      id
      name
      ownerId
      picture
      type
    }
  }
}

`
export const LEAVE_OWNED_GROUP = gql`
mutation MyMutation($_eq: String = "", $_eq1: uuid = "") {
  update_groups(where: {ownerId: {_eq: $_eq}, id: {_eq: $_eq1}}, _set: {ownerId: null}) {
    returning {
      id
      name
      ownerId
      picture
      type
    }
    affected_rows
  }
}

`