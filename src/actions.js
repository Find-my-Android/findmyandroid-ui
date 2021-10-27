export const Action = Object.freeze({
  /* User Signup, Login, Logout */
  FinishLoggingInUser: "FinishLoggingInUser",
  FinishAddingUser: "FinishAddingUser",
  FinishSettingUser: "FinishSettingUser",
  FinishEditingUser: "FinishEditingUser",
  FinishLoggingOutUser: "FinishLoggingOutUser",

  /* Notifications */
  AddNotification: "AddNotification",
  DismissNotification: "DismissNotification",

  /* Phones */
  FinishLoadingPhones: "FinishLoadingPhones",

  /* Admin */
  FinishLoadingUsers: "FinishLoadingUsers",
});

export const host = "https://fmya.duckdns.org:8445";

function checkForErrors(response) {
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  return response;
}

/*********************************** User Login ***********************************/

export function startLoggingInUser(email, password, history) {
  const user = { email, password };
  const loginOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  };

  return (dispatch) => {
    fetch(`${host}/user/login`, loginOptions)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(finishLoggingInUser(data.jwt));
          history.push("/dashboard");

          const getUserOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.jwt}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          };
          fetch(`${host}/user`, getUserOptions)
            .then(checkForErrors)
            .then((response) => response.json())
            .then((userData) => {
              if (userData.ok) {
                dispatch(finishSettingUser(userData.user[0]));
                dispatch(DismissNotification());
              }
            })
            .catch((e) => {
              console.error(e);
              dispatch(
                AddNotification({
                  type: "danger",
                  message: "Error getting user",
                })
              );
            });
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          AddNotification({
            type: "danger",
            message: "Invalid username or password",
          })
        );
      });
  };
}

export function finishLoggingInUser(jwt) {
  return {
    type: Action.FinishLoggingInUser,
    payload: jwt,
  };
}

export function finishSettingUser(user) {
  return {
    type: Action.FinishSettingUser,
    payload: user,
  };
}

export function startEditingUser(first_name, last_name, user_id, jwt) {
  const user = { first_name, last_name };
  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return (dispatch) => {
    fetch(`${host}/user/edit`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          user.user_id = user_id;
          dispatch(FinishEditingUser(user));
          dispatch(
            AddNotification({
              type: "success",
              message: "User information successfully updated!",
            })
          );
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          AddNotification({
            type: "danger",
            message: "User information failed to be edited, so sorry. :(",
          })
        );
      });
  };
}

export function FinishEditingUser(user) {
  return {
    type: Action.FinishEditingUser,
    payload: user,
  };
}

/*********************************** User Logout ***********************************/

export function startLoggingOutUser(history) {
  return (dispatch) => {
    document.cookie = "jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    dispatch(finishLoggingOutUser());
    history.push("/");
  };
}

export function finishLoggingOutUser() {
  return {
    type: Action.FinishLoggingOutUser,
    payload: "",
  };
}

/*********************************** User Signup ***********************************/

export function startAddingUser(
  first_name,
  last_name,
  email,
  primary_num,
  secondary_num,
  password,
  history
) {
  const account_type = 0;
  const user = {
    first_name,
    last_name,
    email,
    primary_num,
    secondary_num,
    account_type,
    password,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return (dispatch) => {
    fetch(`${host}/user/signup`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          user.user_id = data.id;
          dispatch(finishAddingUser(user));
          history.push("/");
          dispatch(
            AddNotification({
              type: "success",
              message: "User Created Successfully!",
            })
          );
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          AddNotification({
            type: "danger",
            message: "Warning! This email is already in use!",
          })
        );
      });
  };
}

/************************************* Phones **************************************/
/* Get */
export function startGettingPhones(user_id, jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/phone/${user_id}/all`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingPhones(data.phones));
        }
      })
      .catch((e) => {
        console.error(e);
        /* Delete me once backend is done */
        dispatch(
          FinishLoadingPhones([
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
          ])
        );
      });
  };
}

/************************************** Admin **************************************/
/* Get Users */
export function startGettingUsers(jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/admin/user/all`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingUsers(data.users));
        }
      })
      .catch((e) => {
        console.error(e);
        /* Delete me once backend is done */
        dispatch(
          FinishLoadingUsers([
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
          ])
        );
      });
  };
}

export function FinishLoadingUsers(users) {
  return {
    type: Action.FinishLoadingUsers,
    payload: users,
  };
}

/* Get Phones */
export function startGettingAllPhones(jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/admin/phone/all`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingPhones(data.phones));
        }
      })
      .catch((e) => {
        console.error(e);
        /* Delete me once backend is done */
        dispatch(
          FinishLoadingPhones([
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
          ])
        );
      });
  };
}

export function FinishLoadingPhones(phones) {
  return {
    type: Action.FinishLoadingPhones,
    payload: phones,
  };
}

/********************************* User Send Email *********************************/
export function startSendingEmail(email, history) {
  // finishSendingEmail(email, history);
  //history.push("/resetpassword");
}

/********************************** Notifications **********************************/

export function finishAddingUser(user) {
  return {
    type: Action.FinishAddingUser,
    payload: user,
  };
}

export function AddNotification(notification) {
  return {
    type: Action.AddNotification,
    payload: notification,
  };
}

export function DismissNotification() {
  return {
    type: Action.DismissNotification,
    payload: {},
  };
}
