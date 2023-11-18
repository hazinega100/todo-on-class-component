import "./App.css";
import {useSelector} from "react-redux";
import {AppStoreType} from "./state/store";
import {TodolistType} from "./state/reducers/todolist-reducer";
import Todolist from "./components/Todolist";

function App() {
    const todolists = useSelector<AppStoreType, TodolistType[]>(state => state.todolist)
    return (
        <div className="App">
            {
                todolists.map(tl => {
                    return <Todolist id={tl.id}
                                     title={tl.title}
                                     filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
