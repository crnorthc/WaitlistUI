import {
    LOGGED_IN,
    SIGNED_UP,
    WAITLISTS
} from '../types'

const initialState = {
    logged_in: false,
    user: null,
    waitlists: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return {
                ...state,
                logged_in: true,
                user: action.payload
            }
        case SIGNED_UP:
            return {
                ...state,
                user: {email: {S: action.payload}}
            }
        case WAITLISTS:
            return {
                ...state,
                waitlists: action.payload
            }
        default:
            return state
    }
}