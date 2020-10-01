import React from 'react';
import { Link, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import ServerIndexContainer from './server/server_index_container';
import ChannelIndexContainer from './channel/channel_index_container';
import MessageIndexContainer from './message/message_index_container';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="main-wrapper">
          <div className="main-servers">
            <ServerIndexContainer />
          </div>
          <div className="main-channels">
            <Switch>
              <ProtectedRoute exact path="/channels/:serverId/:channelId" component={ChannelIndexContainer} />
              {/* <ProtectedRoute exact path="/channels/@me" component={FriendContainer}/> */}
            </Switch>
          </div>
          <div className="main-messages">
            <Switch>
              <ProtectedRoute exact path="/channels/:serverId/:channelId" component={MessageIndexContainer} />
            </Switch>
          </div>
        </div>
      </>
    )
  }
}

export default Main;