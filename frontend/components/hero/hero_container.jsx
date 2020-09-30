import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Hero from './hero';

const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id]
  };
};

const mDTP = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Hero);
