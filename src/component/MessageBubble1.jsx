import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../recoil";
import "./HomeStyle.css";

const DELETE_OWNED_MESSAGE = gql`
  mutation MyMutation($fromUserView: Boolean!, $_eq: uuid!) {
    update_messages(
      where: { id: { _eq: $_eq } }
      _set: { fromUserView: $fromUserView }
    ) {
      affected_rows
    }
  }
`;
const DELETE_MESSAGE = gql`
  mutation MyMutation($_eq: uuid = "", $toUserView: Boolean!) {
    update_messages(
      where: { id: { _eq: $_eq } }
      _set: { toUserView: $toUserView }
    ) {
      affected_rows
    }
  }
`;
const DELETE_MESSAGE_PERMANENT = gql`
  mutation MyMutation($_eq: uuid = "") {
    delete_messages(where: { id: { _eq: $_eq } }) {
      affected_rows
    }
  }
`;

const DELETE_OWNED_GROUP_MESSAGE = gql`
  mutation MyMutation($fromUserView: Boolean!, $_eq: uuid!) {
    update_groupMessages(
      where: { id: { _eq: $_eq } }
      _set: { fromUserView: $fromUserView }
    ) {
      affected_rows
    }
  }
`;
const DELETE_GROUP_MESSAGE = gql`
  mutation MyMutation($_eq: uuid!, $toUserView: Boolean!) {
    update_groupMessages(
      where: { id: { _eq: $_eq } }
      _set: { toUserView: $toUserView }
    ) {
      affected_rows
    }
  }
`;
const DELETE_PERMANENT_GROUP_MESSAGE = gql`
  mutation MyMutation($_eq1: uuid = "") {
    delete_groupMessages(where: { id: { _eq: $_eq1 } }) {
      affected_rows
    }
  }
`;

const EDIT_MESSAGE = gql`
  mutation MyMutation($_eq: uuid = "", $messages: String = "") {
    update_messages(
      where: { id: { _eq: $_eq } }
      _set: { message: $messages }
    ) {
      affected_rows
    }
  }
`;

const EDIT_GROUP_MESSAGE = gql`
mutation MyMutation($_eq: uuid = "", $messages: String = "") {
  update_groupMessages(where: {id: {_eq: $_eq}}, _set: {message: $messages}) {
    affected_rows
  }
}

`;

function MessageBubble1(props) {
  const { isMe, message } = props;
  const [selectedUser] = useRecoilState(selectedUserState);
  const [deleteOwnedMessage] = useMutation(DELETE_OWNED_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [deleteMessagePermanent] = useMutation(DELETE_MESSAGE_PERMANENT);
  const [deleteOwnedGroupMessage] = useMutation(DELETE_OWNED_GROUP_MESSAGE);
  const [deleteGroupMessage] = useMutation(DELETE_GROUP_MESSAGE);
  const [deletePermanentGroupMessage] = useMutation(
    DELETE_PERMANENT_GROUP_MESSAGE
  );
  const [viewEdit, setViewEdit] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  // const [editGroupMessage, setEditGroupMessage] = useState("")
  const [queryEdit] = useMutation(EDIT_MESSAGE);
  const [queryEditGroup] = useMutation(EDIT_GROUP_MESSAGE)
  const handleChangeEdit = (e) => {
    setEditMessage(e.target.value + " (Edited)");
  };
  const handleEdit = (id, updateMessage) => {
    queryEdit({ variables: { _eq: id, messages: updateMessage } });
  };
  const handleEditGroup = (id, updateMessage) =>{
    queryEditGroup({variables:{_eq:id, messages:updateMessage}})
  }
  const openEdit = () => {
    setViewEdit(true);
  };
  const closeEdit = () => {
    setViewEdit(false);
  };
  const handleDeleteOwnedMessage = (id) => {
    deleteOwnedMessage({ variables: { _eq: id, fromUserView: false } });
  };
  const handleDeleteMessage = (id) => {
    deleteMessage({ variables: { _eq: id, toUserView: false } });
  };
  const handleDeletePermanent = (id) => {
    deleteMessagePermanent({ variables: { _eq: id } });
  };
  const handleDeleteOwnedGroupMessage = (id) => {
    deleteOwnedGroupMessage({ variables: { _eq: id, fromUserView: false } });
  };
  const handleDeleteGroupMessage = (id) => {
    deleteGroupMessage({ variables: { _eq: id, toUserView: false } });
  };

  const handleDeletePermanentGroupMessage = (id) => {
    deletePermanentGroupMessage({ variables: { _eq1: id } });
  };
  return (
    <div
      className={isMe ? "chat-message-right pb-4" : "chat-message-left pb-4"}
    >
      <div>
        <img
          src={message?.fromUser?.picture}
          className="rounded-circle mr-1"
          alt="Chris Wood"
          width="40"
          height="40"
        />
        <div className="text-muted small text-nowrap mt-2">
          {moment(message.created_at).format("LT")}
        </div>
      </div>
      <div
        className={
          isMe
            ? "flex-shrink-1 bg-light rounded py-2 px-3 mr-3"
            : "flex-shrink-1 bg-light rounded py-2 px-3 ml-3"
        }
      >
        <div className="font-weight-bold mb-1">
          {isMe ? "You" : message?.fromUser?.name}
        </div>
        {isMe ? (
          <>
            <div
              style={{
                padding: "10px",
                backgroundColor: "#1BA0E6",
                color: "white",
              }}
            >
              {message?.fromUserView ? (
                message?.message
              ) : (
                <div>
                  <i>(deleted)</i>
                </div>
              )}
            </div>
            {viewEdit ? (
              <>
                <input
                  type="text"
                  class="form-control"
                  placeholder={message?.message}
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  onChange={(e) => handleChangeEdit(e)}
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={() => selectedUser.type==="user"? handleEdit(message?.id, editMessage):handleEditGroup(message?.id, editMessage)}
                >
                  Change
                </button>
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={() => closeEdit()}
                >
                  Done
                </button>
                <br />
              </>
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#42423d",
              color: "white",
            }}
          >
            {message.toUserView ? (
              message?.message
            ) : (
              <div>
                <i>(deleted)</i>
              </div>
            )}
          </div>
        )}
        <button
          className="btn btn-light"
          target="_blank"
          rel="noopener noreferrer"
          style={isMe ? { color: "#1BA0E6" } : { color: "#42423d" }}
          onClick={() =>
            selectedUser?.type === "user"
              ? isMe
                ? handleDeleteOwnedMessage(message?.id)
                : handleDeleteMessage(message?.id)
              : isMe
              ? handleDeleteOwnedGroupMessage(message?.id)
              : handleDeleteGroupMessage(message?.id)
          }
        >
          Delete
        </button>
        {isMe ? (
          <>
            <button
              className="btn btn-light"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1BA0E6" }}
              onClick={() =>
                selectedUser?.type === "user"
                  ? handleDeletePermanent(message?.id)
                  : handleDeletePermanentGroupMessage(message?.id)
              }
            >
              Delete Permanent
            </button>
            <button
              className="btn btn-light"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1BA0E6" }}
              onClick={() => openEdit()}
            >
              Edit
            </button>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble1;
