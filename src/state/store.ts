import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import {todolistReducer} from "./reducers/todolist-reducer";
import thunk from "redux-thunk";
import {ThunkDispatch} from "redux-thunk/src/types";
import {tasksReducer} from "./reducers/tasks-reducer";
import {appReducer} from "./reducers/app-reducer";
import {authReducer} from "./reducers/auth-reducer";

const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppStoreType = ReturnType<typeof rootReducer>
export type AppDispatchThunkType = ThunkDispatch<AppStoreType, unknown, AnyAction>;

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

// @ts-ignore
window.store = store