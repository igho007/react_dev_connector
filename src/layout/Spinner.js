import React from "react";

const spinnerStyle = { margin: "30% auto", fontSize: "3rem" };

const Spinner = () => {
  return (
    <div className="text-center" style={spinnerStyle}>
      <div className="spinner-border mt-5" role="status"></div>
    </div>
  );
};

export default Spinner;
