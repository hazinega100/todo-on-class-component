import React, {Component} from "react";
import {FilterType, removeTodolistTC} from "../../state/reducers/todolist-reducer";
import {connect} from "react-redux";
import {AppDispatchThunkType, AppStoreType} from "../../state/store";
import style from "./Todolist.module.css"
import {TasksStateType} from "../../state/reducers/tasks-reducer";
import TasksContainer from "../Task/TasksContainer";

type PropsType = {
    id: string
    title: string
    filter: FilterType
    tasks: TasksStateType
    deleteTodolist: (todolistId: string) => void
}

class Todolist extends Component<PropsType, any> {
    render() {
        const deleteTodolist = () => {
            this.props.deleteTodolist(this.props.id)
        }
        let tasksForTodolist = this.props.tasks[this.props.id]
        return (
            <div className="todolist">
                <h3>{this.props.title}
                    <button onClick={deleteTodolist}>x</button>
                </h3>
                <div className="btn_wrapper">
                    <TasksContainer {...this.props} tasks={tasksForTodolist} todolistId={this.props.id}/>
                    <button className={style.btn}>All</button>
                    <button className={style.btn}>Complete</button>
                    <button className={style.btn}>Active</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStoreType) => {
    return {
        tasks: state.tasks
    }
}

const mapDispatchToProps = (dispatch: AppDispatchThunkType) => {
    return {
        deleteTodolist(todolistId: string) {
            dispatch(removeTodolistTC(todolistId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);