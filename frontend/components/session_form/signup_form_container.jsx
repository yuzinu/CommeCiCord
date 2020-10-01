import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signup, clearErrors } from '../../actions/session_actions';
import SignUpForm from './signup_form';

const mSTP = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Continue',
  };
};

const mDTP = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(connect(mSTP, mDTP)(SignUpForm));
