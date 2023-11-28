import {Component} from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import Todolist from "./Todolist/Todolist";
import {connect} from "react-redux";
import {addTodolistTC, getTodolistTC, TodolistsType} from "../../state/reducers/todolist-reducer";
import {AppStoreType} from "../../state/store";
import {AppReducerType} from "../../state/reducers/app-reducer";
import Loading from "../Loading";
import {Navigate} from "react-router-dom";

type PropsType = {
    todolists: TodolistsType[]
    app: AppReducerType
    login: boolean
    getTodolistTC: () => void
    addTodolistTC: (title: string) => void
}

class Todolists extends Component<PropsType, any> {
    componentDidMount() {
        if (this.props.login) {
            this.props.getTodolistTC()
        }
    }

    render() {
        if (this.props.app.status === 'loading') {
            return <Loading/>
        }
        if (!this.props.login) {
            return <Navigate to={'/login'} />
        }
        return (
            <div>
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
        app: state.app,
        login: state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps, {
    getTodolistTC,
    addTodolistTC
})(Todolists)