import { Action } from "./actions";

const initialState = {
  isWaiting: false,
  authenticated: false,
  jwt: "",
  user: {},
  email: "",
  admin: false,
  notification: {},
  phone: {},
  users: [],
  phones: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    /**** User Login  ****/
    case Action.FinishLoggingInUser:
      return {
        ...state,
        jwt: action.payload,
        authenticated: true,
      };
    case Action.FinishSettingUser:
      return {
        ...state,
        user: action.payload,
        admin: action.payload.type.toLowerCase() === "admin",
        authenticated: true,
      };
    case Action.FinishEditingUser:
      return {
        ...state,
        user: action.payload,
      };
    /**** User Logout  ****/
    case Action.FinishLoggingOutUser:
      return {
        ...state,
        authenticated: false,
        jwt: "",
        user: {},
        admin: false,
        email: action.payload,
        phones: [],
        users: [],
      };
    /**** User Signup  ****/
    case Action.FinishAddingUser:
      return {
        ...state,
        email: action.payload,
      };
    /**** Phones ****/
    case Action.FinishLoadingPhones:
      return {
        ...state,
        phones: action.payload,
      };
    case Action.FinishEditingPhone:
      return {
        ...state,
        phone: action.payload,
      };
    /**** Admin ****/
    case Action.FinishLoadingUsers:
      return {
        ...state,
        users: action.payload,
      };
    /**** Notifications ****/
    case Action.AddNotification:
      return {
        ...state,
        notification: action.payload,
      };
    case Action.DismissNotification:
      return {
        ...state,
        notification: {},
      };
    default:
      return state;
  }
}

export default reducer;
