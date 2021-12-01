import "./bootstrap.min.css";
import Contact1 from "../../component/Contact1";
import "./Home1.css";
import mainLogo from "./Group 1.png";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../recoil";
import Message from "../../component/Message";
import MessageForm from "../../component/MessageForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const CHANGE_GROUP_NAME = gql`
  mutation MyMutation($_eq: uuid = "", $name: String = "") {
    update_groups(where: { id: { _eq: $_eq } }, _set: { name: $name }) {
      returning {
        id
        picture
        name
      }
      affected_rows
    }
  }
`;
function Home1() {
  const [selectedUser] = useRecoilState(selectedUserState);
  const [nameGroup, setNameGroup] = useState(selectedUser?.name);
  const [changeGroupName] = useMutation(CHANGE_GROUP_NAME);
  const [editGroup, setEditGroup] = useState(false);
  const handleChangeGName = (e) => {
    setNameGroup(e.target.value);
  };
  const handleUpdateGName = (newName) => {
    changeGroupName({ variables: { _eq: selectedUser.id, name: newName } });
  };
  const openEdit = () => {
    setEditGroup(true);
  };
  const closeEdit = () => {
    setEditGroup(false);
  };
  return (
    <main className="content">
      <div className="container p-0">
        <img
          src={mainLogo}
          className="img-fluid"
          alt="ChatLiteLogo"
          style={{ height: "10vh", padding: "10px" }}
        />

        <div className="card">
          <div className="row g-0">
            <Contact1 />

            <div className="col-12 col-lg-7 col-xl-9">
              <div className="py-2 px-4 border-bottom d-none d-lg-block">
                <div className="d-flex align-items-center py-1">
                  <div className="position-relative">
                    <img
                      src={
                        selectedUser?.picture
                          ? selectedUser?.picture
                          : "https://bootdey.com/img/Content/avatar/avatar3.png"
                      }
                      className="rounded-circle mr-1"
                      alt={selectedUser?.name ? selectedUser?.name : "Username"}
                      width="40"
                      height="40"
                    />
                  </div>
                  <div className="flex-grow-1 pl-3">
                    <strong>
                      &nbsp;
                      {selectedUser?.name ? selectedUser?.name : "Username"}
                    </strong>
                    <br />
                  </div>
                  {selectedUser?.type==="group"? editGroup ? (
                    <div></div>
                  ) : (
                    <>
                    <button
                      className="btn btn-light"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1BA0E6" }}
                      onClick={() => openEdit()}
                    >
                      Change Group Name
                    </button>
                    (Need Refresh)
                    </>
                  ):<div></div>}

                  {editGroup ? (
                    <>
                      <input
                        type="text"
                        class="form-control"
                        style={{ marginLeft: "300px" }}
                        placeholder={selectedUser?.name}
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e)=>handleChangeGName(e)}
                      />
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={()=>handleUpdateGName(nameGroup)}
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
                    </>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>

              <Message />
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home1;
