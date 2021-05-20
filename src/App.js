import React, { useContext, createContext, useState } from "react";
import logo from './logo.svg';
import './App.css';
import Login from "./login-page/loginPage";
import { connect } from 'react-redux';
// import Timekeeping from './timekeeping-page/Timekeeping';
import Home from './home-page/homePage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import './App.scss';
import {withCookies,Cookies} from 'react-cookie';
import { instanceOf } from 'prop-types';

class App extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){
    super(props)
  }

  render () {
    let cookie = {...this.props.cookies}

    return (
      <Router>
        <Switch>
          <Route
                exact
                path="/"
                render={() => {
                    return (
                      cookie.cookies.access_token != undefined ?
                      <Redirect to="/home" /> :
                      <Route exact path="/" component={Login} />
                    )
                }}
              />

            <Route path="/home/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuthen: state.loginReducer.isAuthen
})

const mapDispatchToProps = dispatch =>({
})

// export default withCookies(App);
export default
withCookies(connect(
	mapStateToProps,
	mapDispatchToProps
)(App))
