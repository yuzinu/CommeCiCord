import React from "react";

class MessageEditForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { sEditting: this.props.isEditting };

    // this.update = this.update.bind(this)
  }

  // exitEdit(e) {
  //   debugger
  //   if (e.key === "Escape") this.props.toggleEdit();
  // }

  handleSubmit(e) {
    e.preventDefault();
    debugger
    this.props.updateMessage({
      id: this.props.message.id,
      body: this.props.body,
      messageable_id: this.props.message.channel_id, 
      messageable_type: "Channel", 
      author_id: this.props.currentUser.id
    });
    this.props.toggleEdit();
  }
  
  render() {
    return (
      <>
        <form className="message-form" onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="message-form-body"
            type="text"
            value={this.props.body}
            onChange={(e) => this.props.update(e)}
            // placeholder={`Message #${this.props.currentChannel}`}
          />
        </form>
      </>
    );
  }
}

export default MessageEditForm;