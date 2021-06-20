import { PROFILE_SUCCESS, TOPARTISTS_SUCCESS, TOPTRACKS_SUCCESS } from "../actions/action_types";



export default function userReducer(state = null, action) {
    switch (action.type) {
        case PROFILE_SUCCESS:
            return { ...state, profile: action.payload }
        case TOPARTISTS_SUCCESS:
            return { ...state, topArtists: action.payload.list, artistTerm: action.payload.term }
        case TOPTRACKS_SUCCESS:
            return { ...state, topTracks: action.payload.list, tracksTerm: action.payload.term }

        default:
            return state
    }
}