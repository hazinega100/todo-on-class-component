const InitState: StateType = {
    auth: false
}

export const authReducer = (state = InitState, action: any) => {
    switch (action.type) {
        case 'XXX': {
            return state
        }
        default: {
            return state
        }
    }
}

// Actions
const changeAuth = (auth: boolean) => {
    return {
        type: 'CHANGE_AUTH',
        auth
    } as const
}

// Thunks

// Types
type StateType = {
    auth: boolean
}