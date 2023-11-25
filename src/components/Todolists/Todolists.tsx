import {Component} from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import Todolist from "./Todolist/Todolist";
import {connect} from "react-redux";
import {addTodolistTC, getTodolistTC, TodolistsType} from "../../state/reducers/todolist-reducer";
import {AppStoreType} from "../../state/store";
import {AppReducerType} from "../../state/reducers/app-reducer";
import Loading from "../Loading";

type PropsType = {
    todolists: TodolistsType[]
    app: AppReducerType
    getTodolistTC: () => void
    addTodolistTC: (title: string) => void
}

class Todolists extends Component<PropsType, any> {
    componentDidMount() {
        this.props.getTodolistTC()
    }

    render() {
        if (this.props.app.status === 'loading') {
            return <Loading/>
        }
        return (
            <div className="container">
                <AddItemForm addItem={this.props.addTodolistTC}/>
                <div className='todo_wrapper'>
                    {
                        this.props.todolists.map(tl => {
                            return <Todolist key={tl.id}
                                             id={tl.id}
                                             title={tl.title}
                                             filter={tl.filter}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStoreType) => {
    return {
        todolists: state.todolist,
        app: state.app
    }
}

export default connect(mapStateToProps, {
    getTodolistTC,
    addTodolistTC
})(Todolists)