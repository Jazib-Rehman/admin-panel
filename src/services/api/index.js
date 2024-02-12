import axios from "axios";
// import jwtDecode from "jwt-decode"; already installed
import { LOGIN, SIGNUP } from "../../constants";

const {
  REACT_APP_AXIOS_RETRY,
  REACT_APP_API_PREFIX,
  REACT_APP_CONTENT_TYPE,
  REACT_APP_APPLICATION_X_WWW_FORM_URLENCODED,
} = process.env;

// Constants
const AXIOS_RETRY = REACT_APP_AXIOS_RETRY;
const API_PREFIX = REACT_APP_API_PREFIX;
const CONTENT_TYPE = REACT_APP_CONTENT_TYPE;
const APPLICATION_X_WWW_FORM_URLENCODED =
  REACT_APP_APPLICATION_X_WWW_FORM_URLENCODED;

export const login = ({ email, password }) => {
  return axios.post(
    `${API_PREFIX}${LOGIN}`,
    { email, password },
    {
      [AXIOS_RETRY]: {
        retries: 3,
      },
      errorHandling: {
        global: true,
      },
    }
  );
};

export const signup = (data) => {
  return axios.post(`${API_PREFIX}${SIGNUP}`, data, {
    [AXIOS_RETRY]: {
      retries: 3,
    },
    errorHandling: {
      global: true,
    },
  });
};
