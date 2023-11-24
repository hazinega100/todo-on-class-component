import React, {Component} from "react";
import {changeTodolistTitleTC, FilterType, removeTodolistTC} from "../../state/reducers/todolist-reducer";
import {connect} from "react-redux";
import style from "./Todolist.module.css"
import TasksContainer from "../Task/TasksContainer";
import AddItemForm from "../AddItemForm/AddItemForm";
import {createTaskTC} from "../../state/reducers/tasks-reducer";
import EditableSpan from "../EditableSpan";

type PropsType = {
    id: string
    title: string
    filter: FilterType
    createTaskTC: (todolistId: string, title: string) => void
    removeTodolistTC: (todolistId: string) => void
    changeTodolistTitleTC: (todolistId: string, title: string) => void
}

class Todolist extends Component<PropsType, any> {
    render() {
        const deleteTodolist = () => {
            this.props.removeTodolistTC(this.props.id)
        }
        const addTask = (title: string) => {
            this.props.createTaskTC(this.props.id, title)
        }
        const changeTodolistTitle = (title: string) => {
            this.props.changeTodolistTitleTC(this.props.id, title)
        }
        return (
            <div className="todolist">
                <h3>
                    <EditableSpan value={this.props.title} onUpdate={changeTodolistTitle} />
                    <button onClick={deleteTodolist}>x</button>
                </h3>
                <AddItemForm addItem={addTask} />
                <div className="btn_wrapper">
                    <TasksContainer todolistId={this.props.id} />
                    <button className={style.btn}>All</button>
                    <button className={style.btn}>Complete</button>
                    <button className={style.btn}>Active</button>
                </div>
            </div>
        );
    }
}

// Лайвхак не создавать ф-цию mapDispatchToProps, а просто передать объект с Thunk Creates, dispatch вызовет автоматом

// const mapDispatchToProps = (dispatch: AppDispatchThunkType) => {
//     return {
//         deleteTodolist(todolistId: string) {
//             dispatch(removeTodolist(todolistId))
//         }
//     }
// }

export default connect(null, {createTaskTC, removeTodolistTC, changeTodolistTitleTC})(Todolist);