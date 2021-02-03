import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser } from '../../actions/user_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = this.props.currentUser.id
    const credentials = {
      username: this.state.username,
      email: this.state.email
    }
    this.props.updateUser({id, credentials}).then(() => this.props.closeModal());
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>Update Your Info</div>
          
          <div>
            <label></label>
            <input type="text" placeholder={this.state.username} value={this.state.username} onChange={this.update("username")}/>
          </div>
          <button>Update</button>
        </form>
      </div>
    )
  }
}

const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id],
  };
};

const mDTP = dispatch => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    openModal: (modal) => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mSTP, mDTP)(UpdateUserForm);