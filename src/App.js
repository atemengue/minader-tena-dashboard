import jwtDecode from "jwt-decode";
import "moment/locale/fr";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Can from "./RBAC/Can";
import { checkCurrentUser } from "./actions/userActions";
import { connectWithSocketServer } from "./realTimeCommunication/socketConnection";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
// const Register = React.lazy(() => import("./views/pages/register/Register"));
// const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
// const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
// const AppMenu = React.lazy(() => import("./containers/AppMenu"));

const routeGuard =
  (Component, props, role) =>
  ({ match }) => {
    if (props.token) {
      <Can
        role={role}
        yes={() => <Component match={match} {...props} />}
        no={() => <Redirect to={{ pathname: "/" }} />}
      />;
    } else {
      return <Component match={match} {...props} />;
    }
  };

const App = (props) => {
  const { checkCurrentUser, isSigned, error } = props;

  const role = localStorage.getItem("roles");
  const userDetails = localStorage.getItem("userDetails");

  const queryClient = new QueryClient(); // react query client
  const check = () => {
    const token = localStorage.getItem("token");

    if (token && userDetails) {
      const { exp } = jwtDecode(token); //
      if (Date.now() >= exp) {
        checkCurrentUser();
        connectWithSocketServer(JSON.parse(userDetails));
        if (error) {
          localStorage.clear("token");
          localStorage.clear("roles");
          localStorage.clear("userDetails");
        }
      }
    }
  };

  useEffect(() => {
    // connectSocket();
    check();
  }, [check]);

  const renderApp = () => {
    // return <Spinner />;
    return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              {isSigned ? (
                <Route
                  path="/"
                  name="Home"
                  render={routeGuard(TheLayout, { ...props }, role)}
                />
              ) : (
                <Route
                  path="/"
                  name="Login Page"
                  render={routeGuard(Login, { ...props }, role)}
                />
              )}
            </Switch>
          </React.Suspense>
          <ToastContainer autoCloase={5000} hideProgressBar />
        </HashRouter>
      </QueryClientProvider>
    );
  };

  return renderApp();
};

const mapStateToProps = ({ authState, userState }) => ({
  loading: authState.loading,
  isSigned: userState.isSigned,
  error: userState.error,
});

export default connect(mapStateToProps, { checkCurrentUser })(App);
