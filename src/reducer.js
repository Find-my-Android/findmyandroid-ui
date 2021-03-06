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
        admin: action.payload.account_type === 1,
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
        phones: state.phones.map((phone) =>
          phone.software_id === action.payload.software_id
            ? action.payload
            : phone
        ),
      };
    case Action.FinishDeletingPhone:
      return {
        ...state,
        phones: state.phones.filter(
          (phone) => phone.software_id !== action.payload.software_id
        ),
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
    case Action.FinishEditingUserAdmin:
      return {
        ...state,
        users: state.users.map((user) =>
          user.user_id === action.payload.user_id ? action.payload : user
        ),
        user:
          state.user.user_id === action.payload.user_id
            ? action.payload
            : state.user,
        admin:
          state.user.user_id === action.payload.user_id
            ? action.payload.account_type === 1
            : state.admin,
      };
    case Action.FinishEditingPhoneAdmin:
      return {
        ...state,
        phones: state.phones.map((phone) =>
          phone.software_id === action.payload.software_id
            ? action.payload
            : phone
        ),
      };
    case Action.FinishDeletingUserAdmin:
      return {
        ...state,
        users: state.users.filter(
          (user) => user.user_id !== action.payload.user_id
        ),
      };
    case Action.FinishDeletingPhoneAdmin:
      return {
        ...state,
        phones: state.phones.filter(
          (phone) => phone.software_id !== action.payload.software_id
        ),
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
