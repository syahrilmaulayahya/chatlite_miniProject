import mainLogo from "./Group 1.png";
import HomeStyle from "./HomeStyle.css";
const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-12 col-sm-3 mainbody"
          style={{backgroundColor: "#1BA0E6", display: "block", overflow: "auto" }}
        >
          <div style={{ marginTop: "50px", marginLeft: "20px" }}>
            <img
              src={mainLogo}
              class="img-fluid"
              alt="ChatLiteLogo"
              style={{ height: "10vh" }}
            />
            <br />
            <br />
            <br />
            <h2 style={{ color: "white" }}>John</h2>
            <br />
            <h2 style={{ color: "white" }}>Direct Message</h2>
            <br />
            <p style={{ color: "white" }}>Pablo</p>
            <p style={{ color: "white" }}>Diablo</p>
            <p style={{ color: "white" }}>Thomas</p>
            <br />
            <br />
            <h2 style={{ color: "white" }}>Group Message</h2>
            <br />
            <p style={{ color: "white" }}>Family</p>
            <p style={{ color: "white" }}>School</p>
            <p style={{ color: "white" }}>Basket</p>
          </div>
        </div>
        <div class="col-12 col-sm-9">
          <div style={{padding:"20px", borderStyle:"solid", marginTop:"50px"}}>
            <h1>
              Thomas
            </h1>
          </div>
          <div class="position-relative">
            <div class="chat-messages p-4">
              <div class="chat-message-right pb-4">
                <div>
                  
                  <div class="text-muted small text-nowrap mt-2">2:33 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div class="font-weight-bold mb-1">You</div>
                  Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                  prodesset te vix.
                </div>
              </div>

              <div class="chat-message-left pb-4">
                <div>
                  
                  <div class="text-muted small text-nowrap mt-2">2:34 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div class="font-weight-bold mb-1">Thomas</div>
                  Sit meis deleniti eu, pri vidit meliore docendi ut, an eum
                  erat animal commodo.
                </div>
              </div>

              <div class="chat-message-right mb-4">
                <div>
                  
                  <div class="text-muted small text-nowrap mt-2">2:35 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div class="font-weight-bold mb-1">You</div>
                  Cum ea graeci tractatos.
                </div>
              </div>

              <div class="chat-message-left pb-4">
                <div>
                  
                  <div class="text-muted small text-nowrap mt-2">2:36 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div class="font-weight-bold mb-1">Thomas</div>
                  Sed pulvinar, massa vitae interdum pulvinar, risus lectus
                  porttitor magna, vitae commodo lectus mauris et velit. Proin
                  ultricies placerat imperdiet. Morbi varius quam ac venenatis
                  tempus.
                </div>
              </div>

              <div class="chat-message-left pb-4">
                <div>
                  
                  <div class="text-muted small text-nowrap mt-2">2:37 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div class="font-weight-bold mb-1">Thomas</div>
                  Cras pulvinar, sapien id vehicula aliquet, diam velit
                  elementum orci.
                </div>
              </div>

              <div class="chat-message-right mb-4">
                <div>
                  
                  <div class="text-muted small text-nowrap mt-2">2:38 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div class="font-weight-bold mb-1">You</div>
                  Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                  prodesset te vix.
                </div>
              </div>

              <div class="chat-message-left pb-4">
                <div>
                  
                  <div class="text-muted small text-nowrap mt-2">2:39 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div class="font-weight-bold mb-1">Thomas</div>
                  Sit meis deleniti eu, pri vidit meliore docendi ut, an eum
                  erat animal commodo.
                </div>
              </div>

              <div class="chat-message-right mb-4">
                <div>
                  
                  <div class="text-muted small text-nowrap mt-2">2:40 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div class="font-weight-bold mb-1">You</div>
                  Cum ea graeci tractatos.
                </div>
              </div>

              <div class="chat-message-right mb-4">
                <div>
                  
                  <div class="text-muted small text-nowrap mt-2">2:41 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div class="font-weight-bold mb-1">You</div>
                  Morbi finibus, lorem id placerat ullamcorper, nunc enim
                  ultrices massa, id dignissim metus urna eget purus.
                </div>
              </div>

              <div class="chat-message-left pb-4">
                <div>
                  
                  <div class="text-muted small text-nowrap mt-2">2:42 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div class="font-weight-bold mb-1">Thomas</div>
                  Sed pulvinar, massa vitae interdum pulvinar, risus lectus
                  porttitor magna, vitae commodo lectus mauris et velit. Proin
                  ultricies placerat imperdiet. Morbi varius quam ac venenatis
                  tempus.
                </div>
              </div>

              <div class="chat-message-right mb-4">
                <div>
                 
                  <div class="text-muted small text-nowrap mt-2">2:43 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div class="font-weight-bold mb-1">You</div>
                  Lorem ipsum dolor sit amet, vis erat denique in, dicunt
                  prodesset te vix.
                </div>
              </div>

              <div class="chat-message-left pb-4">
                <div>
                  
                  <div class="text-muted small text-nowrap mt-2">2:44 am</div>
                </div>
                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div class="font-weight-bold mb-1">Thomas</div>
                  Sit meis deleniti eu, pri vidit meliore docendi ut, an eum
                  erat animal commodo.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
