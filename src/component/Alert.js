import React, { Fragment } from "react";
import { useAlertState } from "../context/alertContext";

const Alert = () => {
  const state = useAlertState();
  console.log(state);
  return (
    <Fragment>
      {state !== null &&
        state.length > 0 &&
        state.map((alert) => (
          <div
            className={`alert alert-${alert.alertType} w-25 mx-auto text-center`}
            key={alert.id}
            role="alert"
            style={{ marginTop: "5rem" }}
          >
            {alert.msg}
          </div>
        ))}
    </Fragment>
  );
};

export default Alert;
