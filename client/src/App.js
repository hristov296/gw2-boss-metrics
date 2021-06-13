import React, { useContext, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Auth from "./components/Auth";
import Register from "./components/Auth/Register";
import Profile from "./components/Auth/Profile";
import jwt_decode from "jwt-decode";
import Store, { Context } from "./state/Store";

import Header from "./components/Header";

const App = () => {
  return (
    <Store>
      <Main />
    </Store>
  );
}

const Main = () => {

  const [state, dispatch] = useContext(Context);
  useEffect(() => {

    // Check for token to keep user logged in
    if (localStorage.currentUser) {

      const token = localStorage.getItem('currentUser');

      // setAuthToken(token);
      const decoded = jwt_decode(token);
      console.log(decoded);

      // Check for expired token
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        dispatch({ type: 'LOGOUT_USER' });
        localStorage.removeItem('currentUser',)
        window.location.href = "./";
      } else {
        console.log('logging ?');
        dispatch({ type: 'LOGIN_USER', payload: decoded });

      }

    }

  }, [dispatch]);

  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <h1 className="text-4xl text-white bg-black">Hsdaeasasasasasdflo</h1>
          </Route>
          <Route exact path="/auth">
            <Auth />
          </Route>
          <Route exact path="/auth/register">
            <Register />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;