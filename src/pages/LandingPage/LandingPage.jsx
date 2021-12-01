import "bootstrap/dist/css/bootstrap.css";
import { useAuth0 } from "@auth0/auth0-react";
import mainLogo from "./Group 1.png";
const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#1BA0E6", width: "100%", height: "100vh" }}
    >
      <div className="row">
        <div className="col-12 col-md-6">
          <div style={{ marginTop: "20%", padding: "10%" }}>
            <img src={mainLogo} className="img-fluid" alt="ChatLiteLogo" />
            <br />
            <br />
            <h1 style={{ color: "white" }}>EASY CHAT WITH FRIENDS</h1>
            <br />
            <h2 style={{ color: "white" }}>
              Stay connected with friends in easiest way!
            </h2>
            <br />
            <button
              className="btn btn-light"
              onClick={() => {
                loginWithRedirect();
              }}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1BA0E6" }}
            >
              Login or Register
            </button>          
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
