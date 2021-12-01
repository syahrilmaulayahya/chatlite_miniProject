import { useSubscription } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import gql from "graphql-tag";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../recoil";
import MessageBubble1 from "./MessageBubble1";
import { CircularProgress } from "@material-ui/core";

const GET_MESSAGES = gql`
  subscription MyQuery($where: messages_bool_exp = {}) {
    messages(where: $where, order_by: { created_at: asc }) {
      id
      fromUserId
      message
      fromUserView
      toUserView
      fromUser {
        name
        picture
      }
      created_at
    }
  }
`;

const GET_MESSAGES_GROUP = gql`
  subscription MySubscription($_eq1: uuid = "") {
    groupMessages(
      where: { toGroupId: { _eq: $_eq1 } }
      order_by: { created_at: asc }
    ) {
      id
      fromUserId
      message
      fromUser {
        name
        picture
      }
      created_at
    }
  }
`;

const Message = () => {
  const [selectedUser] = useRecoilState(selectedUserState);

  const { user } = useAuth0();

  let params = { where: {} };
  if (selectedUser) {
    params.where = {
      _or: [
        {
          fromUserId: {
            _eq: user.sub,
          },
          toUserId: {
            _eq: selectedUser.id,
          },
        },
        {
          fromUserId: {
            _eq: selectedUser.id,
          },
          toUserId: {
            _eq: user.sub,
          },
        },
      ],
    };
  }

  const { data, loading } = useSubscription(GET_MESSAGES, {
    variables: params,
  });
  const { data: dataGroup, loading: loadingGroup } = useSubscription(
    GET_MESSAGES_GROUP,
    { variables: { _eq1: selectedUser?.id } }
  );

  console.log("groupMessages", dataGroup);
  console.log("messages", data);

  return (
    <div className="position-relative">
      <div className="chat-messages p-4">
        {selectedUser?.type === "user" ? (
          selectedUser ? (
            loading ? (
              <div style={{ margin: "auto" }}>
                <CircularProgress></CircularProgress>
              </div>
            ) : (
              <div>
                {data?.messages?.map((m) => {
                  return (
                    <MessageBubble1
                      key={m.id}
                      message={m}
                      isMe={user.sub === m.fromUserId}
                    />
                  );
                })}
              </div>
            )
          ) : (
            <div>Tap Friends or Groups To Start Chat</div>
          )
        ) : selectedUser ? (
          loadingGroup ? (
            <div style={{ margin: "auto" }}>
              <CircularProgress></CircularProgress>
            </div>
          ) : (
            <div>
              {dataGroup?.groupMessages?.map((m) => {
                return (
                  <MessageBubble1
                    key={m.id}
                    message={m}
                    isMe={user.sub === m.fromUserId}
                  />
                );
              })}
            </div>
          )
        ) : (
          <div>Tap Friends or Groups To Start Chat</div>
        )}
      </div>
    </div>
  );
};

export default Message;
