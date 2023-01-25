import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
};

const ProfileDispatch = createContext();
const ProfileState = createContext();

const profileReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

const ProifleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return (
    <ProfileDispatch.Provider value={dispatch}>
      <ProfileState.Provider value={state}>{children}</ProfileState.Provider>
    </ProfileDispatch.Provider>
  );
};

export const useProfileDispatch = () => useContext(ProfileDispatch);
export const useProfileState = () => useContext(ProfileState);

export default ProifleProvider;
