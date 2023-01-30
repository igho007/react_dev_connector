import axios from "axios";
import React, { Fragment, useCallback, useEffect } from "react";
import {
  useProfileDispatch,
  useProfileState,
} from "../../context/profileContext";
import { GET_PROFILE, PROFILE_ERROR } from "../../context/types";
import Spinner from "../../layout/Spinner";
import { setAuthToken } from "../../utils/setAuthToken";
import { FaUser } from "react-icons/fa";
import { useAuthState } from "../../context/authContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useProfileDispatch();
  const { profile, loading } = useProfileState();
  const { user } = useAuthState();

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
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: e.response.statusText, status: e.response.status },
        });
      }
    };

    loadProfile();
  }, [dispatch]);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="app__container ">
      <h1 className="fs-1 text-primary">Dashboard</h1>
      <p className="lead">
        <FaUser /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <h2>has</h2>
      ) : (
        <Fragment>
          <p className="fs-2">
            You have not yet set up a profile, please add some info
          </p>
          <Link to="/create-profile" className="btn btn-primary">
            Create Profile
          </Link>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
