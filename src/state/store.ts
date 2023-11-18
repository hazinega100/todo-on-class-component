import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import {todolistReducer} from "./reducers/todolist-reducer";
import thunk from "redux-thunk";
import {ThunkDispatch} from "redux-thunk/src/types";

const rootReducer = combineReducers({
    todolist: todolistReducer
})

export type AppStoreType = ReturnType<typeof rootReducer>
export type AppThunkType = ThunkDispatch<AppStoreType, unknown, AnyAction>;

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

// @ts-ignore
window.store = store