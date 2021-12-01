import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";
import "./HomeStyle.css";

const DELETE_OWNED_MESSAGE = gql`
mutation MyMutation($fromUserView: Boolean!, $_eq: uuid!) {
  update_messages(where: {id: {_eq: $_eq}}, _set: {fromUserView: $fromUserView}) {
    affected_rows
  }
}

`
const DELETE_MESSAGE = gql`
mutation MyMutation($_eq: uuid = "", $toUserView: Boolean!) {
  update_messages(where: {id: {_eq: $_eq}}, _set: {toUserView: $toUserView}) {
    affected_rows
  }
}

`
const DELETE_MESSAGE_PERMANENT = gql`
mutation MyMutation($_eq: uuid = "") {
  delete_messages(where: {id: {_eq: $_eq}}) {
    affected_rows
  }
}

`
function MessageBubble1(props) {
  const { isMe, message } = props;
  const [deleteOwnedMessage] = useMutation(DELETE_OWNED_MESSAGE)
  const [deleteMessage] = useMutation(DELETE_MESSAGE)
  const [deleteMessagePermanent] = useMutation(DELETE_MESSAGE_PERMANENT)
  const handleDeleteOwnedMessage =(id)=>{
    deleteOwnedMessage({variables:{_eq:id, fromUserView:false}})
  }
  const handleDeleteMessage= (id)=>{
    deleteMessage({variables:{_eq:id, toUserView:false}})
  }
  const handleDeletePermanent = (id) =>{
    deleteMessagePermanent({variables:{_eq:id}})
  }
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
          <div
            style={{
              padding: "10px",
              backgroundColor: "#1BA0E6",
              color: "white",
            }}
          >
            {message?.fromUserView? message?.message:<div><i>(deleted)</i></div>}
          </div>
        ) : (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#42423d",
              color: "white",
            }}
          >
            {message.toUserView? message?.message:<div><i>(deleted)</i></div>}
          </div>
        )}
        <button
                            className="btn btn-light"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={isMe?{ color: "#1BA0E6" }:{ color:"#42423d"}}
                            onClick={()=>isMe?handleDeleteOwnedMessage(message?.id):handleDeleteMessage(message?.id)}
                            
                          >
                            Delete
                          </button>
                          {
                            isMe? <button
                            className="btn btn-light"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#1BA0E6" }}
                            onClick={()=>handleDeletePermanent(message?.id)}
                          >
                            Delete Permanent
                          </button>:<div></div>
                          }
                         
      </div>
      
    </div>
  );
}

export default MessageBubble1;
