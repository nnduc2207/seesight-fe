import * as actionTypes from "./actions"

const initialState = {
    token: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                token: action.token,
                user: action.user,
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null,
                user: null,
            }
        case actionTypes.SAVEUSER:
            return {
                ...state,
                user: action.user,
            }
        default:
            return state
    }
}

export default reducer
