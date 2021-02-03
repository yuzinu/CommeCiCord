import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch, withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { openModal, closeModal } from '../actions/modal_actions';
import { logout } from '../actions/session_actions';
import ServerIndex from './server/server_index';
import ChannelIndex from './channel/channel_index';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.match.path === "/channels/@me") {
      return (
        <div className="main-wrapper">
          <div className="main-servers">
            <ServerIndex />
          </div>
          <div className="main-channels">
            <div className="friends-list">
              Friendship functionality currently in the works.
              <br/>
              Please click on one of the server icons to chat!
            </div>
            <button
              onClick={() => dispatch(openModal('update user'))}
              className="add-server"
            >Update User Info</button>
          </div>
        </div>
      )
    } else {
      return (
        <>
          <div className="main-wrapper">
            <div className="main-servers">
              <ServerIndex />
            </div>
            <div className="main-channels">
              <Switch>
                <ProtectedRoute exact path="/channels/:serverId/:channelId" component={ChannelIndex} />
                {/* <ProtectedRoute exact path="/channels/@me" component={FriendContainer}/> */}
              </Switch>
            </div>
          </div>
        </>
      )
    }
  }
}

const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id]
  };
};

const mDTP = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(mSTP, mDTP)(Main));
