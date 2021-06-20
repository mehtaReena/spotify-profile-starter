import { THROW_ERROR, TOKEN_SUCCESS ,REMOVE_TOKEN } from "../actions/action_types";

const initialState = {
    token: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case THROW_ERROR:
            return {...state, error: action.payload}
        case TOKEN_SUCCESS:
            return { ...state, error: null, token: action.payload.token, refresh: action.payload.refresh }
        case REMOVE_TOKEN:
                return { ...state, token: null };
        default:
            return state
    }
}