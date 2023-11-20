import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchThunkType, AppStoreType} from "./state/store";
import {getTodolistTC, TodolistsType} from "./state/reducers/todolist-reducer";
import Todolist from "./components/Todolist/Todolist";
import {useEffect} from "react";
import AddItemForm from "./components/AddItemForm/AddItemForm";

const App = () => {
    const dispatch = useDispatch<AppDispatchThunkType>()
    const todolists = useSelector<AppStoreType, TodolistsType[]>(state => state.todolist)
    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])
    return (
        <div className="App">
            <h1>TodoLists</h1>
            <AddItemForm/>
            <div className='todo_wrapper'>
                {
                    todolists.map(tl => {
                        return <Todolist key={tl.id}
                                         id={tl.id}
                                         title={tl.title}
                                         filter={tl.filter}
                        />
                    })
                }
            </div>
        </div>
    );
}

export default App;
