import React from "react";

const Nav = (props) => {
  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    dots.push(
      <span
        key={`step-${i}`}
        className={`dot ${isActive ? "dot_active" : ""}`}
        onClick={() => props.goToStep(i)}
      >
        &bull;
      </span>
    );
  }

  return <div className="dot_nav">{dots}</div>;
};

export default Nav;
