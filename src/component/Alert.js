import { motion } from "framer-motion";
import React from "react";
import { useAlertState } from "../context/alertContext";

const Alert = () => {
  const state = useAlertState();
  return (
    <div className={`${state.length === 0 ? "mt-0" : "app__container"}`}>
      {state !== null &&
        state.length > 0 &&
        state.map((alert) => (
          <motion.div
            whileInView={{ x: [-100, 0] }}
            transition={{ duration: 0.5 }}
            className={`alert alert-${alert.alertType} w-25 mx-auto text-center`}
            key={alert.msg}
            role="alert"
          >
            {alert.msg}
          </motion.div>
        ))}
    </div>
  );
};

export default Alert;
