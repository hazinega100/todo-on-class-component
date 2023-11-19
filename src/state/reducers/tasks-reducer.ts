import {Dispatch} from "redux";
import {tasksApi} from "../../api/tasksApi";

const initState: TaskType[] = [
    {id: '1', title: 'HTML'},
    {id: '2', title: 'JS'},
]

const GET_TASKS = 'GET_TASKS'

export const tasksReducer = (state = initState, action: ActionType): TaskType[] => {
    switch (action.type) {
        case GET_TASKS: {
            return state
        }
        default: {
            return state
        }
    }
}

// Actions
const getTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: GET_TASKS,
        todolistId,
        tasks
    } as const
}
// Thunk
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
}

// Types
export type TaskType = {
    id: string
    title: string
}

type GetTasksType = ReturnType<typeof getTasksAC>
type ActionType = GetTasksType