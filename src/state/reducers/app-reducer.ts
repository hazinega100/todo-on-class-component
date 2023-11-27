const initState: AppReducerType = {
    status: 'idle',
    messages: [],
    error: null,
    success: null
}

export const appReducer = (state = initState, action: ActionType) => {
    switch (action.type) {
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case "SET_MESSAGES": {
            return {
                ...state,
                messages: action.messages[0]
            }
        }
        case "SET_ERROR": {
            return {
                ...state,
                error: action.error
            }
        }
        case "SET_SUCCESS": {
            return {
                ...state,
                success: action.success
            }
        }
        default: {
            return state
        }
    }
}

// Action
export const setStatusAC = (status: StatusType) => {
    return {
        type: 'SET_STATUS',
        status
    } as const
}
export const setMessagesAC = (messages: string[]) => {
    return {
        type: 'SET_MESSAGES',
        messages
    } as const
}
export const setAppErrorAC = (error: string[] | null) => {
    return {
        type: 'SET_ERROR',
        error
    } as const
}
export const setAppSuccessAC = (success: string[] | null) => {
    return {
        type: 'SET_SUCCESS',
        success
    } as const
}
// Type
export type StatusType = 'idle' | 'success' | 'loading' | 'error'

export type AppReducerType = {
    status: StatusType
    messages: string[]
    error: null | string[]
    success: null | string[]
}

type SetStatusType = ReturnType<typeof setStatusAC>
export type SetMessagesType = ReturnType<typeof setMessagesAC>
export type SetErrorType = ReturnType<typeof setAppErrorAC>
export type SetSuccessType = ReturnType<typeof setAppSuccessAC>

type ActionType = SetStatusType | SetMessagesType | SetErrorType | SetSuccessType