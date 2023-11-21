import React, {Component} from "react";
import {connect} from "react-redux";
import {AppDispatchThunkType, AppStoreType} from "../../state/store";
import {createTaskTC, getTasksTC, removeTaskTC, TasksStateType} from "../../state/reducers/tasks-reducer";
import Task from "./Task";

type PropsType = {
    tasks: TasksStateType
    todolistId: string
    getTasks: (todolistId: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}

class TasksContainer extends Component<PropsType, any> {
    componentDidMount() {
        this.props.getTasks(this.props.todolistId)
    }

    render() {
        const removeTask = (id: string) => {
            this.props.removeTask(this.props.todolistId, id)
        }
        let tasksForTodolist = this.props.tasks[this.props.todolistId]
        return (
            <div>
                {tasksForTodolist.map(t => <Task key={t.id} task={t} removeTask={removeTask} />)}
            </div>
        )
    }
}

const mapStateToProps = (state: AppStoreType) => {
    return {
        tasks: state.tasks
    }
}

const mapDispatchToProps = (dispatch: AppDispatchThunkType) => {
    return {
        getTasks(todolistId: string) {
            dispatch(getTasksTC(todolistId))
        },
        createTask(todolistId: string, title: string) {
            dispatch(createTaskTC(todolistId, title))
        },
        removeTask(todolistId: string, taskId: string) {
            dispatch(removeTaskTC(todolistId, taskId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);