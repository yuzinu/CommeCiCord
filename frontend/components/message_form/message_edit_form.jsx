import React from "react";

class MessageEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: this.props.body };

    this.handleExit = this.handleExit.bind(this)
  }

  handleExit(e) {
    if (e.key === "Escape") {
      this.props.toggleEdit()
    }
  }
  
  componentDidMount() {
    window.addEventListener("keydown", this.handleExit);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleExit);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.body === this.state.body) {
      this.props.toggleEdit();
    } else {
      this.props.updateMessage({
        id: this.props.message.id,
        body: this.props.body,
        messageable_id: this.props.message.channel_id, 
        messageable_type: "Channel", 
        author_id: this.props.currentUser.id
      });
      this.props.toggleEdit();
    }
  }
  
  render() {
    return (
      <>
        <form className="message-form" onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="message-edit-form-body"
            type="text"
            value={this.props.body}
            onChange={(e) => this.props.update(e)}
          />
        </form>
      </>
    );
  }
}

export default MessageEditForm;