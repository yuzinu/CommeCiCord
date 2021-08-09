// import { connect } from 'react-redux';
// import ServerMenu from './server_menu';
// import { fetchServers, createServer, deleteServer } from '../../actions/server_actions';
// import { openModal, closeModal } from '../../actions/modal_actions';


// const mSTP = (state, ownProps) => {
//   return {
//     currentUser: state.entities.users[state.session.id],
//     serverId: location.hash.spliy
//   };
// };

// const mDTP = dispatch => {
//   return {
//     fetchServers: () => dispatch(fetchServers()),
//     createServer: (server) => dispatch(createServer(server)),
//     deleteServer: (serverId) => dispatch(deleteServer(serverId)),
//     openModal: (modal) => dispatch(openModal(modal)),
//     closeModal: () => dispatch(closeModal())
//   };
// };

// export default connect(mSTP, mDTP)(ServerMenu);