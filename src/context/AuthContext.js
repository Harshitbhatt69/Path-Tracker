//import { AsyncStorage } from "@react-native-community/async-storage";
import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin": //both signin and signup is doing same work, so we have condenced down it
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
  //make api request with email and password
  //try signup
  //handle successful by updating state
  //else show error
  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    //navigate inside mainflow
    navigate("TrackList");
  } catch (err) {
    //for checking errors
    console.log(err.response.data);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with Signup",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  // try signin
  //handle successful by updating state
  //else show error
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    //or checking errors
    console.log(err.response.data);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with Signin",
    });
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("loginFlow");
  }
};

const signout = (dispatch) => async () => {
  //somehow sign out
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { itoken: null, errorMessage: "" }
);
