import { useMutation, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
const GET_MEMBERS = gql`
subscription MySubscription($_eq: uuid = "") {
  users(where: {members: {groupId: {_eq: $_eq}}}) {
    id
    name
    picture
  }
}
`
const KICK_MEMBER = gql`
mutation MyMutation($_eq: String = "") {
  delete_groupLists(where: {userId: {_eq: $_eq}}) {
    affected_rows
  }
}

`
function GroupList(props) {
  const { group } = props;
  
  const {data, loading} = useSubscription(GET_MEMBERS,{variables:{_eq:group.id}})
  const [showMember, setShowMember] = useState(false);
  const handleShowMember = () => {
    setShowMember(!showMember);
  };
  const [kickMember] = useMutation(KICK_MEMBER)
  
  const handleKick = (id)=>{
    kickMember({variables:{_eq:id}})
  }
  console.log("group id", group.id)
  
  return (
    <>
      <div className="list-group-item list-group-item-action border-0">
        <div className="d-flex align-items-start">
          <div className="position-relative">
            <img
              src={group.picture}
              className="rounded-circle mr-1"
              alt="Username"
              width="40"
              height="40"
            />
            &nbsp;{group.name}
            {group.ownerId ? <div>(Admin)</div> : <div></div>}
          </div>
        </div>

        {showMember ? (
          loading?"Loading...":
          <>
          
            <br />
            <div className="position-relative">
            
            {data?.users?.map((u)=>{
              return(
                <>
                <img
                src={u.picture}
                className="rounded-circle mr-1"
                alt="Username"
                width="40"
                height="40"
              />
              &nbsp;{u.name}&nbsp;
              {group.ownerId?
              <button
        className="btn btn-light"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1BA0E6" }}
        onClick={()=>handleKick(u.id)}
      >
        Kick
      </button>:<div></div>}
              </>
              )
            })}
             
            
            </div>
            <br/>
            
          </>
        ) : (
          <div></div>
        )}
      </div>
      <button
        className="btn btn-light"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1BA0E6" }}
        onClick={() => handleShowMember()}
      >
        Show Member
      </button>
    </>
  );
}

export default GroupList;
