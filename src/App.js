import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./pages/LandingPage/LandingPage";

import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { useState } from "react";

import React from "react";

import { CircularProgress } from "@material-ui/core";
import Home1 from "./pages/Home/Home1";
import { RecoilRoot } from "recoil";
function App() {
  const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();

  const [token, setToken] = useState("");
  console.log("Token", token);
  if (isLoading) {
    return (
      <div style={{ marginLeft: "50%", marginTop: "25%" }}>
        <CircularProgress></CircularProgress>
      </div>
    );
  }
  getIdTokenClaims().then((resp) => {
    console.log(resp);
    if (resp) {
      setToken(resp.__raw);
    }
  });
  const wsLink = new WebSocketLink({
    uri: "wss://chatlite.herokuapp.com/v1/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    },
  });
  const httpLink = new HttpLink({
    uri: "https://chatlite.herokuapp.com/v1/graphql",
  });
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local cookie if it exists
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, splitLink]),
  });

  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        {isAuthenticated ? <Home1 /> : <LandingPage />}
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default App;
