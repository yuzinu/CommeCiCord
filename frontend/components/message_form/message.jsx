import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageEditForm from './message_edit_form';
import { deleteMessage, updateMessage, fetchMessage } from '../../actions/message_actions';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {message: this.props.message,
                  body: this.props.message.body,
                  isEditting: false};
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.message !== prevState.message) {
      this.setState({message: this.state.message})
    }
  }

  toggleEdit() {
    this.setState({isEditting: !this.state.isEditting})
  }

  update(e) {
    // debugger
    e.preventDefault();      
    this.setState({ body: e.target.value });
  }

  render() {
    let message = this.state.message;
    // debugger
    return (
      <div className="message-container">
        <img className="message-avatar" src={message.avatar}></img>
        <div className="message-body">
          <div className="message-author">{message.author}</div>
          <div>{message.created_at}</div>
          {(!this.state.isEditting) ? 
            <div>{message.body}</div> : 
            <MessageEditForm 
              update={this.update.bind(this)}
              updateMessage={this.props.updateMessage}
              message={this.state.message}
              body={this.state.body}
              isEditting={this.state.isEditting}
              toggleEdit={this.toggleEdit}
              currentUser={this.props.currentUser}
              />
          }
          {(!this.state.isEditting && message.author_id === this.props.currentUser.id) ?
            <button onClick={this.toggleEdit}>Edit</button> :
            null
          }
          <button onClick={() => this.props.deleteMessage(message.id)}>Delete</button>
        </div>
      </div>
    )
  }
}

const mSTP = (state, ownProps) => {
  let message = ownProps.message;
  return {
    messageId: message.id,
    currentUser: state.entities.users[state.session.id],
    messages: Object.values(state.entities.messages),
    users: Object.values(state.entities.users),
    channels: Object.values(state.entities.channels)
  };
};

const mDTP = dispatch => {
  return {
    fetchMessage: (message) => dispatch(fetchMessage(message)),
    updateMessage: (message) => dispatch(updateMessage(message)),
    deleteMessage: (messageId) => dispatch(deleteMessage(messageId)),
  };
};

export default withRouter(connect(mSTP, mDTP)(Message));