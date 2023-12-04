import React from "react";
import { connect } from "react-redux";
import {
  emailChanged,
  login,
  passwordChanged,
} from "../../../actions/authActions";

const Login = (props) => {
  const onChangeEmail = (event) => {
    props.emailChanged(event.target.value);
  };

  const onChangeMotDePasse = (event) => {
    props.passwordChanged(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.login({ email: props.email, motDePasse: props.motDePasse });
  };

  return (
    <div className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img
                src="icons/armee_camerounaise.jpg"
                alt="login"
                className="login-card-img"
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper">
                  <img src="icons/helios.jpg" alt="logo" className="logo" />
                </div>
                <p className="login-card-description">
                  Connectez-vous à votre compte
                </p>
                <form onSubmit={(event) => onSubmit(event)}>
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={`form-control ${
                        props.error ? "is-invalid" : ""
                      } `}
                      placeholder="Entrez votre addresse email"
                      value={props.email}
                      onChange={onChangeEmail}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="sr-only">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className={`form-control ${
                        props.error ? "is-invalid" : ""
                      } `}
                      placeholder="Entrez votre mot de passe"
                      value={props.motDePasse}
                      onChange={onChangeMotDePasse}
                    />
                  </div>
                  {props.loading ? (
                    <div
                      className="spinner-border spinner-border-lg"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <button
                      name="login"
                      id="login"
                      type="submit"
                      className="btn btn-block login-btn mb-4"
                    >
                      Connectez-vous
                    </button>
                  )}
                </form>
                <a href="#!" className="forgot-password-link"></a>
                <p className="login-card-footer-text">
                  {" "}
                  <a href="#!" className="text-reset"></a>
                </p>
                <nav className="login-card-footer-nav">
                  <div className="brand-wrapper">
                    <img src="icons/cameroun.png" alt="logo" className="logo" />
                    <span className="ml-1">
                      HELIOS &copy; 2023 DASHBOARD MONITORING.
                    </span>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authState }) => ({
  email: authState.email,
  motDePasse: authState.password,
  loading: authState.loading,
  error: authState.error,
});

export default connect(mapStateToProps, {
  login,
  emailChanged,
  passwordChanged,
})(Login);
