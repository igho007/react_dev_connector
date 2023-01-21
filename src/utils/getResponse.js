import axios from "axios";

export const login = async (email, password) => {
  const res = await axios.post(
    "/api/user/login",
    JSON.stringify({ email, password }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

export const register = async (name, email, password, confirmPassword) => {
  const res = await axios.post(
    "/api/user/register",
    JSON.stringify({ name, email, password, confirmPassword }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};
