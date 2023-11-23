import React, {Component} from "react";
import {connect} from "react-redux";
import {AppDispatchThunkType, AppStoreType} from "../../state/store";
import {
    changeTaskStatusTC, changeTaskTitleTC,
    createTaskTC,
    getTasksTC,
    removeTaskTC,
    TasksStateType,
    TaskStatuses
} from "../../state/reducers/tasks-reducer";
import Task from "./Task";

type PropsType = {
    tasks: TasksStateType
    todolistId: string
    getTasks: (todolistId: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeStatus: (todolistId: string, taskId: string, status: TaskStatuses, title: string) => void
    changeTitle: (todolistId: string, taskId: string, status: TaskStatuses, title: string) => void
}

class TasksContainer extends Component<PropsType, any> {
    componentDidMount() {
        this.props.getTasks(this.props.todolistId)
    }

    render() {
        const removeTask = (id: string) => {
            this.props.removeTask(this.props.todolistId, id)
        }
        const changeTaskStatus = (id: string, status: TaskStatuses, title: string) => {
            this.props.changeStatus(this.props.todolistId, id, status, title)
        }
        const changeTaskTitle = (id: string, status: TaskStatuses, title: string) => {
            this.props.changeTitle(this.props.todolistId, id, status, title)
        }
        let tasksForTodolist = this.props.tasks[this.props.todolistId]
        return (
            <div>
                {tasksForTodolist.map(t => <Task key={t.id}
                                                 task={t}
                                                 removeTask={removeTask}
                                                 changeStatus={changeTaskStatus}
                                                 changeTaskTitle={changeTaskTitle}
                />)}
            </div>
        )
    }
}

const mapStateToProps = (state: AppStoreType) => {
    return {
        tasks: state.tasks,
        taskStatus: state.tasks.status
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
        },
        changeStatus(todolistId: string, taskId: string, status: TaskStatuses, title: string) {
            dispatch(changeTaskStatusTC(todolistId, taskId, status, title))
        },
        changeTitle(todolistId: string, taskId: string, status: TaskStatuses, title: string) {
            dispatch(changeTaskTitleTC(todolistId, taskId, status, title))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);