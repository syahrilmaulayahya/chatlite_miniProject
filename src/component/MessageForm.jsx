import { useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import gql from "graphql-tag";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../recoil";

const INSERT_MESSAGE = gql`
  mutation MyMutation(
    $fromUserId: String = ""
    $message: String = ""
    $toUserId: String = ""
  ) {
    insert_messages_one(
      object: {
        message: $message
        toUserId: $toUserId
        fromUserId: $fromUserId
      }
    ) {
      id
    }
  }
`;
const INSERT_MESSAGE_GROUP = gql`
  mutation MyMutation(
    $fromUserId: String = ""
    $message: String = ""
    $toGroupId: uuid = ""
  ) {
    insert_groupMessages(
      objects: {
        fromUserId: $fromUserId
        message: $message
        toGroupId: $toGroupId
      }
    ) {
      returning {
        id
      }
    }
  }
`;
const MessageForm = () => {
  const { user } = useAuth0();
  const [message, setMessage] = useState("");
  const [selectedUser] = useRecoilState(selectedUserState);
  const [insertMessage] = useMutation(INSERT_MESSAGE, {
    variables: {
      fromUserId: user.sub,
      message: message,
      toUserId: selectedUser?.id,
    },
  });
  const [insertMessageGroup] = useMutation(INSERT_MESSAGE_GROUP, {
    variables: {
      fromUserId: user.sub,
      message: message,
      toGroupId: selectedUser?.id,
    },
  });

  const HandleSubmit = (e) => {
    e.preventDefault();

    insertMessage();

    setMessage("");
  };
  const HandleSubmitGroup = (e) => {
    e.preventDefault();
    insertMessageGroup();
    setMessage("");
  };
  const HandleChange = (e) => {
    setMessage(e.target.value);
  };
  console.log("selected", selectedUser);
  return (
    <>
      {selectedUser ? (
        <div className="flex-grow-0 py-3 px-4 border-top">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message"
              value={message}
              onChange={HandleChange}
            />
            <button
              className="btn btn-primary"
              onClick={(e) =>
                selectedUser?.type === "user"
                  ? HandleSubmit(e)
                  : HandleSubmitGroup(e)
              }
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MessageForm;
