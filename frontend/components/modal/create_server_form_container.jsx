import { connect } from 'react-redux';
import CreateServerForm from './create_server_form';
import { fetchServers, createServer } from '../../actions/server_actions';
import { openModal, closeModal } from '../../actions/modal_actions';


const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id],
  };
};

const mDTP = dispatch => {
  return {
    fetchServers: () => dispatch(fetchServers()),
    createServer: (server) => dispatch(createServer(server)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mSTP, mDTP)(CreateServerForm);