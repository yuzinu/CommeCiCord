import * as UserAPI from "../util/user_api_util";
import { receiveCurrentUser } from "../actions/session_actions"
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

const receiveUsers = (users) => {
  return {
    type: RECEIVE_ALL_USERS,
    users
  }
};

const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  }
}

export const fetchUsers = () => dispatch => {
  return UserAPI.fetchUsers()
    .then(users => {
      dispatch(receiveUsers(users))
    });
}

export const updateUser = (user) => dispatch => {
  if (user.id === "1") {
    alert("You can't change demo user credentials")
  }
  return UserAPI.updateUser(user.id, user.credentials)
    .then(user => dispatch(receiveUser(user)
    ));
}

// export const fetchServers = () => dispatch => {
//   return (
//     ServerAPI.fetchServers().then(servers => dispatch(receiveServers(servers)))
//   );
// };

// export const fetchServer = (serverId) => dispatch => {
//   return (
//     ServerAPI.fetchServer(serverId).then(server => dispatch(receiveServer(server)))
//   );
// };

// export const createServer = (server) => dispatch => {
//   return (
//     ServerAPI.createServer(server).then(server => dispatch(receiveServer(server)))
//   );
// };

// export const updateServer = (server) => dispatch => {
//   return (
//     ServerAPI.updateServer(server).then(server => dispatch(receiveServer(server)))
//   );
// };

// export const deleteServer = (serverId) => dispatch => {
//   return (
//     ServerAPI.deleteServer(serverId).then(() => dispatch(removeServer(serverId)))
//   );
// };