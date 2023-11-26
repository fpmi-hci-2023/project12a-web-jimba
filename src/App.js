import React, { Component, Fragment, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Navbar from './components/home/NavBar';
import { ToastComponent } from './components/common'
import { userService } from './infrastructure';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import './styles/App.css';
import { css } from '@emotion/core';
import { CircleLoader } from 'react-spinners';

import { connect } from 'react-redux';
import { logoutAction } from './store/actions/authActions';
import PrivateRoute from './components/common/routes/PrivateRoute';
import ProtectedRoutes from './components/common/routes/ProtectedRoutes';
import PublicRoute from './components/common/routes/PublicRoute';

const RegisterPage = lazy(() => import('./components/auth/RegisterPage'))
const LoginPage = lazy(() => import('./components/auth/LoginPage'))
const HomePage = lazy(() => import('./components/home/HomePage'))
const ErrorPage = lazy(() => import('./components/common/ErrorPage'))

const override = css`
        display: block;
        margin: 8rem auto;
        border-color: red;
`;

class App extends Component {
  constructor(props) {
    super(props)

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.logout();

    toast.success(<ToastComponent.successToast text={`You have been successfully logged out.`} />, {
      position: toast.POSITION.TOP_RIGHT
    });

    window.location.href = '/login';
  }

  render() {
    const loggedIn = userService.isTheUserLoggedIn();

    return (
      <Fragment>
        <Navbar loggedIn={localStorage.getItem('token') != null} onLogout={this.onLogout} {...this.props} />
        <ToastContainer transition={Zoom} closeButton={false} />
        <Suspense fallback={
          <div className='sweet-loading'>
            <CircleLoader
              css={override}
              sizeUnit={"px"}
              size={150}
              color={'#61dafb'}
              loading={true}
            />
          </div>}>
          <Switch>
            <PublicRoute 
              path="/register"
              isAuthenticated={loggedIn}
            >
              <RegisterPage />
            </PublicRoute>
            <PublicRoute 
              path="/login"
              isAuthenticated={loggedIn}
            >
              <LoginPage />
            </PublicRoute>
            <PrivateRoute
              path='/'
              isAuthenticated={loggedIn}
            >
              <ProtectedRoutes />
            </PrivateRoute>
            {/* <Route exact path="/" component={StartPage} />
            {!loggedIn && <Route exact path="/register" component={RegisterPage} />}
            {!loggedIn && <Route exact path="/login" component={LoginPage} />}
            {loggedIn && <Route path="/home" component={HomePage} />} */}
            <Route exact path="/error" component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));