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
  users: [
    {
      user_id: 1,
      first_name: "Jonas",
      last_name: "Kohls",
      primary: "715-382-6526",
      secondary: "715-874-6448",
      email: "kohlsjw3656@uwec.edu",
      type: "Admin",
      password: "******",
    },
    {
      user_id: 2,
      first_name: "Madison",
      last_name: "Deleon",
      email: "deleonmp7478@uwec.edu",
      primary: "715-555-1234",
      secondary: "",
      type: "User",
      password: "******",
    },
    {
      user_id: 3,
      first_name: "Nuo",
      last_name: "Xu",
      email: "xun9991@uwec.edu",
      primary: "715-555-5555",
      secondary: "",
      type: "Admin",
      password: "******",
    },
  ],
  phones: [
    {
      phone_id: 1,
      user_id: 1,
      name: "Main Cell Phone",
      phone_number: "715-382-6526",
      latitude: 44.7956,
      longitude: -91.5039,
      tracking: "Active",
      status: "",
    },
    {
      phone_id: 2,
      user_id: 1,
      name: "Secondary Cell Phone",
      phone_number: "715-555-1234",
      latitude: 44.8716,
      longitude: -91.9267,
      tracking: "Not",
      status: "",
    },
    {
      phone_id: 3,
      user_id: 1,
      name: "Wifi Phone Back Home",
      phone_number: "715-555-5433",
      latitude: 20.5937,
      longitude: 78.9629,
      tracking: "Not",
      status: "Stolen",
    },
    {
      phone_id: 1,
      user_id: 2,
      name: "Main phone",
      phone_number: "715-879-3242",
      latitude: 39.7684,
      longitude: -86.1581,
      tracking: "Active",
      status: "",
    },
  ],
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
