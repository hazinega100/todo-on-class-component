import {Dispatch} from "redux";
import {setAppErrorAC, setStatusAC} from "../state/reducers/app-reducer";
import {ResponseType} from "../api/todolistApi";

export const handlerServerError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages))
    } else {
        dispatch(setAppErrorAC(['some error occurred']))
    }
    dispatch(setStatusAC('error'))
}

export const handlerNetworkError = (error: {message: string[]}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message : ['some error occurred']))
    dispatch(setStatusAC('error'))
}