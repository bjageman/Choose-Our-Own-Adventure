import React from 'react'
//Router
import { Route, Switch } from 'react-router'

import Host from './setup/Host'
import HostSettings from './setup/HostSettings'
import Join from './setup/Join'
import Lobby from './setup/Lobby'

import WebSocket from './WebSocket'

const StoryRouter = ({ match }) => (
    <WebSocket>
    <Switch>
        <Route exact path={match.url + "/join"} component={Join}/>
        <Route exact path={match.url + "/lobby"} component={Lobby}/>
        <Route exact path={match.url + "/host"} component={Host}/>
        <Route path={match.url + "/host/:story_id"} component={HostSettings}/>
    </Switch>
    </WebSocket>
)

export default StoryRouter
