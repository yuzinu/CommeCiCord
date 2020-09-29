import * as ServerAPI from '../util/server_api_util';

export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const REMOVE_SERVER = 'REMOVE_SERVER';

const receiveServers = (servers) => {
  return {
    type: RECEIVE_SERVERS,
    servers
  };
};

const receiveServer = (server) => {
  return {
    type: RECEIVE_SERVER,
    server
  };
};

const removeServer = (serverId) => {
  return {
    type: REMOVE_SERVER,
    serverId
  };
};

export const requestServers = () => dispatch => {
  return (
    ServerAPI.fetchServers().then(servers => dispatch(receiveServers(servers)))
  );
};

export const requestServer = (serverId) => dispatch => {
  return (
    ServerAPI.fetchServer(serverId).then(server => dispatch(receiveServer(server)))
  );
};

export const createServer = (server) => dispatch => {
  return (
    ServerAPI.createServer(server).then(server => dispatch(receiveServer(server)))
  );
};

export const updateServer = (server) => dispatch => {
  return (
    ServerAPI.updateServer(server).then(server => dispatch(receiveServer(server)))
  );
};

export const deleteServer = (serverId) => dispatch => {
  return (
    ServerAPI.deleteServer(serverId).then(() => dispatch(removeServer(serverId)))
  );
};