import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from './component/LandingPage';


import Home from './component/Home';

function App() {
  const { getIdTokenClaims} = useAuth0();
  getIdTokenClaims().then(resp=>{
    console.log((resp));
  })
  return (
    // <LandingPage/>
    <Home/>
  );
}

export default App;
