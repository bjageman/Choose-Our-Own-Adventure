import React from 'react'
//Router

import { Grid, GridItem, Button } from 'bjageman-react-toolkit'

import ReduxLink from 'base/components/links/Redux'

class Story extends React.Component {
  render() {
    return (
        <Grid>
            <ReduxLink to="/story/edit"><Button raised>Go to Editor</Button></ReduxLink>
            <ReduxLink to="/story/play"><Button raised>Play a Game</Button></ReduxLink>
        </Grid>
    )
  }
}

export default Story
