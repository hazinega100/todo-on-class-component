import {LoginType} from "../../components/Login/LoginMUI";
import {Dispatch} from "redux";
import {setStatusAC} from "./app-reducer";
import {authApi} from "../../api/authApi";
import {handlerNetworkError, handlerServerError} from "../../utils/error-utils";

const InitState: StateType = {
    isLoggedIn: false,
    isInitialize: false
}

export const authReducer = (state = InitState, action: ActionType): StateType => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN': {
            return {
                ...state,
                isLoggedIn: action.login
            }
        }
        case "SET_IS_INITIALIZE": {
            return {
                ...state,
                isInitialize: action.value
            }
        }
        default: {
            return state
        }
    }
}

// Actions
export const setIsLoggedIn = (login: boolean) => {
    return {
        type: 'SET_IS_LOGGED_IN',
        login
    } as const
}
export const setIsInitialize = (value: boolean) => {
    return {
        type: 'SET_IS_INITIALIZE',
        value
    } as const
}

// Thunks
export const loginTC = (login: LoginType) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    authApi.login(login)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(setStatusAC('success'))
            } else {
                handlerServerError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerNetworkError(error, dispatch)
        })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    authApi.authMe()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(setStatusAC('success'))
            } else {
                handlerServerError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitialize(true))
        })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    authApi.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(setStatusAC('success'))
            } else {
                handlerServerError(res.data, dispatch)
            }
        })
        .catch(error => {
            handlerNetworkError(error, dispatch)
        })
}

// Types
export type StateType = {
    isLoggedIn: boolean
    isInitialize: boolean
}

type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>
type SetIsInitializeType = ReturnType<typeof setIsInitialize>

type ActionType = SetIsLoggedInType | SetIsInitializeType