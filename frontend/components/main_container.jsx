import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/session_actions';
import Main from './main';

const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id]
  };
};

const mDTP = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(mSTP, mDTP)(Main));
