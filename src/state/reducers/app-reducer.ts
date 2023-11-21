const initState: AppReducerType = {
    status: 'idle',
    messages: []
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

// Type
export type StatusType = 'idle' | 'success' | 'loading' | 'error'

export type AppReducerType = {
    status: StatusType
    messages: string[]
}

type SetStatusType = ReturnType<typeof setStatusAC>
export type SetMessagesType = ReturnType<typeof setMessagesAC>

type ActionType = SetStatusType | SetMessagesType