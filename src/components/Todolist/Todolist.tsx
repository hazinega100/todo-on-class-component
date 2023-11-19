import React, {Component} from "react";
import {FilterType} from "../../state/reducers/todolist-reducer";
import {connect} from "react-redux";
import {AppDispatchThunkType, AppStoreType} from "../../state/store";
import Task from "../Task/Task";
import style from "./Todolist.module.css"

type PropsType = {
    id: string
    title: string
    filter: FilterType
}

class Todolist extends Component<PropsType, any> {
    componentDidMount() {
    }

    render() {
        const deleteTodolist = () => {

        }
        return (
            <div className="todolist">
                <h3>{this.props.title}
                    <button onClick={deleteTodolist}>x</button>
                </h3>
                <div className="btn_wrapper">
                    <Task />
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
        getTasks() {

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);