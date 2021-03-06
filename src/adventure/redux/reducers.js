import { createReducer } from 'redux-act'
import * as actions from './actions'
import { updateObjectInArray, removeItem, reorderObjectsInArray } from 'redux/utils'

const initial = {
  editor: {
      story: {
          name: "", description: "",
          pages:[]
      },
      page: {
          name: "",
          description: "",
          choices: [{
              name: "",
              description: "",
              actions: [{
                name: "",
                command: {},
                target: 0,
              }],
          }],
          choice: {}},
      listing: [],
      fetching: false,
  },
  session: { }
}

export const session = createReducer({
    [actions.getSessionSuccess]: (state, payload) => {
        return payload.session
    },
    [actions.getPageSuccess]: (state, payload) => {
        return { ...state, page: { ...payload.page, choices: payload.page.choices } }
    },
    [actions.voteChoiceSuccess]: (state, payload) => {
        return {
            ...state,
            page: {
                ...state.page,
                choices: payload.choices,
                winner: payload.winner,
            }
        }
    },
    [actions.getSessionsSuccess]: (state, payload) => {
        return { ...state, listing: payload.listing }
    },
    [actions.quitGameSuccess]: (state, payload) => {
        return initial.session
    },
}, initial.session)

export const editor = createReducer({
    [actions.getToolsSuccess]: (state, payload) => {
        return { ...state, tools: { commands: payload.commands }, fetching: false }
    },
    [actions.getStorySuccess]: (state, payload) => {
        return { ...state, story: payload.story, page: initial.editor.page, fetching: false }
    },
    [actions.getStoriesSuccess]: (state, payload) => {
        return { listing: payload.listing, fetching: false, story: initial.editor.story, page: initial.editor.page }
    },
    [actions.updateStory]: (state, payload) => {
        return { ...state, story: payload.story }
    },
    [actions.updatePage]: (state, payload) => {
        var result = {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray( state.story.pages, payload.page, payload.index )
            },
            page: state.page
        }
        return result
    },
    [actions.addPage]: (state, payload) => {
        return {
            ...state,
            story: {
                ...state.story,
                pages: [...state.story.pages, payload.page]
            },
            page: initial.editor.page
        }
    },
    [actions.reorderPages]: (state, payload) => {
        return {
            ...state,
            story: {
                ...state.story,
                pages: reorderObjectsInArray(state.story.pages, payload.firstIndex, payload.secondIndex)
            }
        }
    },
    [actions.deletePage]: (state, payload) => {
        return {
            ...state,
            story: {
                ...state.story,
                pages: removeItem(state.story.pages, payload.index)
            }
        }
    },
    //Choice Reducers
    [actions.updateChoice]: (state, payload) => {
        var current_page = state.story.pages[payload.page_index]
        return {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray(
                    state.story.pages,
                    {
                        ...current_page,
                        choices: updateObjectInArray(
                            current_page.choices,
                            payload.choice,
                            payload.index
                        ),

                    },
                    payload.page_index )
            }
        }
    },
    [actions.addChoice]: (state, payload) => {
        var current_page = state.story.pages[payload.index]
        return {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray(
                    state.story.pages,
                    {
                        ...current_page,
                        choice: { name: "", description: ""},
                        choices: [ ...current_page.choices, payload.choice ]
                    },
                    payload.index )
            }
        }
    },
    [actions.deleteChoice]: (state, payload) => {
        var current_page = state.story.pages[payload.page_index]
        return {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray(
                    state.story.pages,
                    {
                        ...current_page,
                        choices: removeItem(current_page.choices, payload.index)
                    },
                    payload.page_index )
            }
        }
    },
    //Action Reducers
    [actions.updateAction]: (state, payload) => {
        var current_page = state.story.pages[payload.page_index]
        var current_choice = current_page.choices[payload.choice_index]
        return {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray(
                    state.story.pages,
                    {
                        ...current_page,
                        choices: updateObjectInArray(
                            current_page.choices,
                            {
                                ...current_choice,
                                actions: updateObjectInArray(
                                    current_choice.actions,
                                    payload.action,
                                    payload.index,
                                )
                            },
                            payload.choice_index
                        ),

                    },
                    payload.page_index )
            }
        }
    },
    [actions.addAction]: (state, payload) => {
        var current_page = state.story.pages[payload.page_index]
        var current_choice = current_page.choices[payload.choice_index]
        return {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray(
                    state.story.pages,
                    {
                        ...current_page,
                        choices: updateObjectInArray(
                            current_page.choices,
                            {
                                ...current_choice,
                                actions: [ ...current_choice.actions, payload.action ]
                            },
                            payload.choice_index )
                    },
                    payload.page_index )
            }
        }
    },
    [actions.deleteAction]: (state, payload) => {
        var current_page = state.story.pages[payload.page_index]
        var current_choice = current_page.choices[payload.choice_index]
        return {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray(
                    state.story.pages,
                    {
                        ...current_page,
                        choices: updateObjectInArray(
                            current_page.choices,
                            {
                                ...current_choice,
                                actions: removeItem(current_choice.actions, payload.index)
                            },
                            payload.choice_index )
                    },
                    payload.page_index )
            }
        }
    },
}, initial.editor)
