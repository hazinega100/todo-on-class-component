import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchThunkType, AppStoreType} from "./state/store";
import {addTodolistTC, getTodolistTC, TodolistsType} from "./state/reducers/todolist-reducer";
import Todolist from "./components/Todolist/Todolist";
import {useEffect} from "react";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {StatusType} from "./state/reducers/app-reducer";
import Loading from "./components/Loading";

const App = () => {
    const dispatch = useDispatch<AppDispatchThunkType>()
    const todolists = useSelector<AppStoreType, TodolistsType[]>(state => state.todolist)
    const status = useSelector<AppStoreType, StatusType>(state => state.app.status)
    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])
    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }
    if (status === 'loading') {
        return <Loading />
    }
    return (
        <div className="App">
            <h1>TodoLists</h1>
            <AddItemForm addItem={addTodolist}/>
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
