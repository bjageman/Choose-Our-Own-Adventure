import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Grid, GridItem, Text } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/links/Redux'

class StoryListItem extends React.Component {
    render() {
        const story = this.props.story
        return(
            <ReduxLink to={"/story/play/host/" + story.slug }>
            <div style={styles.container}>
                <Text h1> {story.name} </Text>
                <Text p> {story.description} </Text>
            </div>
            </ReduxLink>
        )
    }
}

const styles = {
    container: {
        border: "1px solid black",
        borderRadius: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
    }
}

class StoryList extends React.Component {
    constructor(props){
        super(props)
        this.props.getStories({
            access_token: this.props.user.access_token,
        })
    }

    render() {
        const story_listing = this.props.editor.listing
        if (story_listing) {
            return(
                <Grid>
                {story_listing.map((story, i) =>
                    <GridItem key={i}><StoryListItem story={story} /></GridItem>
                )}
                </Grid>
            )
        }else{
            return null
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList)
