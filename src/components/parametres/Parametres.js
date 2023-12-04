import React from "react";
import { connect } from "react-redux";
import Profile from "../profil/Profile";

export const Parametres = () => {
  return <Profile />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Parametres);
