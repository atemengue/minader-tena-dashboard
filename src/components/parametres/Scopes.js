import React from "react";
import { connect } from "react-redux";

export const Scopes = () => {
  return (
    <div>
      <h1>Scopes</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Scopes);
