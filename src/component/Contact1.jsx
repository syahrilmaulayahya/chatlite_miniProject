import ContactList1 from "./ContactList1";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../recoil";
import { useAuth0 } from "@auth0/auth0-react";
import "./bootstrap.min.css";
import { CircularProgress } from "@material-ui/core";
import GroupList from "./GroupList";
import { useState } from "react";
import {
  GET_GROUPS,
  GET_OWNED_GROUP,
  GET_USERS,
} from "./GraphQLContact/Subscription";
import { GET_USER, SEARCH_GROUP, SEARCH_USER } from "./GraphQLContact/Query";
import {
  CREATE_GROUP,
  DELETE_CONTACT,
  INSERT_CONTACT,
  JOIN_GROUP,
  LEAVE_GROUP,
  LEAVE_OWNED_GROUP,
} from "./GraphQLContact/Mutation";

function Contact1() {
  const setSelectedUser = useRecoilState(selectedUserState)[1];
  const { logout, user } = useAuth0();

  const { data, loading } = useSubscription(GET_USERS);
  const { data: datauser } = useQuery(GET_USER, {
    variables: { _eq: user.sub },
  });
  const { data: group } = useSubscription(GET_GROUPS, {
    variables: { _eq1: user.sub },
  });
  const { data: ownedGroup } = useSubscription(GET_OWNED_GROUP, {
    variables: { _eq: user.sub },
  });
  const [searchGroup, setSearchGroup] = useState("");
  const [editJoinGroup, setEditJoinGroup] = useState(false);
  const [editAddContact, setEditAddContact] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [viewCreateGroup, setViewCreateGroup] = useState(false);
  const [nameGroup, setNameGroup] = useState("Group");
  const [createGroup] = useMutation(CREATE_GROUP);
  const [leaveOwnedGroup] = useMutation(LEAVE_OWNED_GROUP);
  const handleEditCGroup = () => {
    setViewCreateGroup(!viewCreateGroup);
  };
  const handleLeaveOwnedGroup = (groupId) => {
    leaveOwnedGroup({ variables: { _eq: user.sub, _eq1: groupId } });
  };
  const handleChangeCGroup = (e) => {
    setNameGroup(e.target.value);
  };
  const handleCreateGroup = (name) => {
    createGroup({ variables: { name: name, ownerId: user.sub } });
  };
  const handleChangeSearchUser = (e) => {
    let userSearch;
    if (e.target.value === "") {
      userSearch = "";
    } else {
      userSearch = "%" + e.target.value + "%";
    }
    setSearchUser(userSearch);
  };
  const handleChangeSearchGroup = (e) => {
    let groupSearch;
    if (e.target.value === "") {
      groupSearch = "";
    } else {
      groupSearch = "%" + e.target.value + "%";
    }
    setSearchGroup(groupSearch);
  };
  const {
    data: findUser,
    loading: loadingFind,
    error: errorFind,
  } = useQuery(SEARCH_USER, { variables: { _ilike: searchUser } });
  const {
    data: findGroup,
    loading: loadingGroup,
    error: errorGroup,
  } = useQuery(SEARCH_GROUP, { variables: { _ilike: searchGroup } });
  const [addContact] = useMutation(INSERT_CONTACT);
  const [deleteContact] = useMutation(DELETE_CONTACT);
  const [leaveGroup] = useMutation(LEAVE_GROUP);
  const [joinGroup] = useMutation(JOIN_GROUP);
  const handleDelete = (userId) => {
    deleteContact({ variables: { _eq: userId } });
  };
  const handleLeaveGroup = (GroupId) => {
    leaveGroup({ variables: { _eq: GroupId, _eq1: user.sub } });
  };
  const handleEditJoinGroup = () => {
    setEditJoinGroup(!editJoinGroup);
    setSearchGroup("");
  };
  const handleUpdateJoinGroup = (newGroup) => {
    joinGroup({ variables: { groupId: newGroup, userId: user.sub } });
  };

  const handleEditContact = () => {
    setEditAddContact(!editAddContact);
    setSearchUser("");
  };
  const handleAddContact = (ContactId) => {
    addContact({ variables: { userId: user.sub, contactId: ContactId } });
  };

  return (
    <div
      className="col-12 col-lg-5 col-xl-3 border-right"
      style={{ borderRight: "solid", borderColor: "#1BA0E6" }}
    >
      <div className="px-4 d-none d-md-block">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <br />
            <div className="position-relative">
              <img
                src={datauser?.users[0].picture}
                className="rounded-circle mr-1"
                alt="Username"
                width="40"
                height="40"
              />
              <strong>&nbsp;{datauser?.users[0].name}</strong>
              <br />
            </div>
            <br />
          </div>
        </div>

        <h2>Direct Message</h2>
        <button
          className="btn btn-light"
          onClick={() => handleEditContact()}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1BA0E6" }}
        >
          Add Contact
        </button>
        <br />

        {editAddContact ? (
          <>
            <br />
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="User ID..."
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={(e) => handleChangeSearchUser(e)}
              />
            </div>
            {searchUser ? (
              loadingFind ? (
                "Loading..."
              ) : errorFind ? (
                "Error"
              ) : findUser?.users?.length === 0 ? (
                "Can't find user"
              ) : (
                findUser?.users?.map((u) => {
                  return (
                    <div key={u.id}>
                      {" "}
                      {u.id === datauser?.users[0].id ? (
                        <div></div>
                      ) : (
                        <div>
                          <img
                            src={u.picture}
                            className="rounded-circle mr-1"
                            alt="Username"
                            width="40"
                            height="40"
                          />
                          <br />
                          {u.name}
                          <br />
                          {u.email}
                          <br />
                          <button
                            className="btn btn-light"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#1BA0E6" }}
                            onClick={() => handleAddContact(u.id)}
                          >
                            Add Contact
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )
            ) : (
              <div>Type a name</div>
            )}
          </>
        ) : (
          <div></div>
        )}

        <hr />
      </div>

      {loading ? (
        <div style={{ margin: "40%" }}>
          <CircularProgress></CircularProgress>
        </div>
      ) : (
        data?.contacts?.map((u) => {
          return (
            <div key={u?.contact?.id}>
              <div onClick={() => setSelectedUser(u.contact)}>
                <ContactList1 contacts={u}></ContactList1>
              </div>
              <button
                className="btn btn-light"
                onClick={() => {
                  handleDelete(u?.id);
                }}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1BA0E6" }}
              >
                Delete Contact
              </button>
              <hr />
            </div>
          );
        })
      )}

      <hr className="d-block d-lg-none mt-1 mb-0" />
      <div className="px-4 d-none d-md-block">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <br />
            <div className="position-relative"></div>
            <br />
          </div>
        </div>
        <h2>Group Message </h2>
        <button
          className="btn btn-light"
          onClick={() => handleEditJoinGroup()}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1BA0E6" }}
        >
          Join a Group
        </button>
        <br />

        {editJoinGroup ? (
          <>
            <br />
            <div class="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Group ID..."
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={(e) => handleChangeSearchGroup(e)}
              />
            </div>
            {searchGroup ? (
              loadingGroup ? (
                "Loading..."
              ) : errorGroup ? (
                "Error"
              ) : findGroup?.groups?.length === 0 ? (
                "Can't find group"
              ) : (
                findGroup?.groups?.map((u) => {
                  return (
                    <div key={u.id}>
                      <div>
                        <img
                          src={u.picture}
                          className="rounded-circle mr-1"
                          alt="Username"
                          width="40"
                          height="40"
                        />
                        <br />
                        {u.name}
                        <br />

                        <br />

                        {u.ownerId === user.sub ? (
                          <div></div>
                        ) : (
                          <button
                            className="btn btn-light"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#1BA0E6" }}
                            onClick={() => handleUpdateJoinGroup(u.id)}
                          >
                            Join Group
                          </button>
                        )}
                        <hr />
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              <div>Type Group Name</div>
            )}
          </>
        ) : (
          <div></div>
        )}
        <button
          className="btn btn-light"
          onClick={() => handleEditCGroup()}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1BA0E6" }}
        >
          Create Group
        </button>
        <br />
        {viewCreateGroup ? (
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Group name..."
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(e) => handleChangeCGroup(e)}
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={() => handleCreateGroup(nameGroup)}
            >
              Create
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <hr />
      </div>
      {loading ? (
        <div style={{ margin: "40%" }}>
          <CircularProgress></CircularProgress>
        </div>
      ) : (
        ownedGroup?.groups?.map((item) => {
          return (
            <div key={item?.id}>
              <div onClick={() => setSelectedUser(item)}>
                <GroupList group={item}></GroupList>
               
                <button
                  className="btn btn-light"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1BA0E6"}}
                  onClick={() => handleLeaveOwnedGroup(item.id)}
                >
                  Leave Group
                </button>
                <hr />
              </div>
            </div>
          );
        })
      )}
      {loading ? (
        <div style={{ margin: "40%" }}>
          <CircularProgress></CircularProgress>
        </div>
      ) : (
        group?.groups?.map((item) => {
          return (
            <div key={item?.id}>
              <div onClick={() => setSelectedUser(item)}>
                <GroupList group={item}></GroupList>
                
                <button
                  className="btn btn-light"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1BA0E6" }}
                  onClick={() => handleLeaveGroup(item.id)}
                >
                  Leave Group
                </button>
                <hr />
              </div>
            </div>
          );
        })
      )}
      <button
        className="btn btn-light"
        onClick={() => {
          logout({ returnTo: "http://localhost:3000/" });
        }}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1BA0E6" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Contact1;
