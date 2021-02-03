import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };
  }
  
  update(field) {
    return e =>
      this.setState({ [field]: e.currentTarget.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].speak({ 
      body: this.state.body,
      messageable_id: this.props.match.params.channelId, 
      messageable_type: "Channel", 
      author_id: this.props.currentUser.id
    });
    this.setState({ body: "" });
  }
  
  render() {
    return (
      <>
        <form className="message-form" onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="message-form-body"
            type="text"
            value={this.state.body}
            onChange={this.update("body")}
            placeholder={`Message #${this.props.currentChannel}`}
          />
          {/* <input type="submit" /> */}
        </form>
      </>
    );
  }
}

export default MessageForm;