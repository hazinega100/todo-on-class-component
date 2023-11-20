const initState: InitStateType = {
    status: 'idle'
}

export const appReducer = (state = initState, action: ActionType) => {
    switch (action.type) {
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
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

// Type
export type StatusType = 'idle' | 'success' | 'loading' | 'error'

type InitStateType = {
    status: StatusType
}

type SetStatusType = ReturnType<typeof setStatusAC>
type ActionType = SetStatusType