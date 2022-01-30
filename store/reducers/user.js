import {
    LOGGED_IN,
    SIGNED_UP,
    WAITLISTS,
    SIGNUPS,
    DELETED
} from '../types'

const initialState = {
    logged_in: false,
    user: null,
    waitlists: null
}

const set_signups = (waitlists, signups, wl_id) => {
    console.log('being passed to set_signups')
    console.log(signups)
    var _waitlists = waitlists
    _waitlists.forEach(waitlist => {
        if (waitlist.uid.S == wl_id) {
            waitlist.signups = signups.sort((a, b) => parseInt(a.pos.N) - parseInt(b.pos.N))
        }
    });
    console.log(_waitlists)
    return _waitlists
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
        case SIGNUPS:               
            return {
                ...state,
                waitlists: set_signups(state.waitlists, action.payload.data.signups, action.payload.wl_id)
            }
        case DELETED:
            return {
                ...state,
                waitlists: set_signups(state.waitlists, action.payload.signups, action.payload.wl_id)
            }
        default:
            return state
    }
}