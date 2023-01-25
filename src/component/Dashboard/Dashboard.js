import axios from "axios";
import React, { useCallback, useEffect } from "react";
import {
  useProfileDispatch,
  useProfileState,
} from "../../context/profileContext";
import { GET_PROFILE } from "../../context/types";
import { setAuthToken } from "../../utils/setAuthToken";

const Dashboard = () => {
  const dispatch = useProfileDispatch();
  const state = useProfileState();
  console.log(state);

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
  }, []);

  const getCurrentProfile = useCallback(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get("/api/profile/me");
        console.log(res);
        dispatch({ type: GET_PROFILE, payload: res.data.profile });
      } catch (e) {
        console.log(e);
      }
    };

    loadProfile();
  }, [dispatch]);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return <div className="app__container">Dashboard</div>;
};

export default Dashboard;
