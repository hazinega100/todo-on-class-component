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
import {FilterType} from "../../state/reducers/todolist-reducer";

type PropsType = {
    tasks: TasksStateType
    todolistId: string
    filter: FilterType
    getTasks: (todolistId: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeStatus: (todolistId: string, taskId: string, status: TaskStatuses, title: string) => void
    changeTitle: (todolistId: string, taskId: string, status: TaskStatuses, title: string) => void
}

class TasksContainer extends Component<PropsType, any> {
    componentDidMount() {
        this.props.getTasks(this.props.todolistId)
    }
    removeTask = (id: string) => {
        this.props.removeTask(this.props.todolistId, id)
    }
    changeTaskStatus = (id: string, status: TaskStatuses, title: string) => {
        this.props.changeStatus(this.props.todolistId, id, status, title)
    }
    changeTaskTitle = (id: string, status: TaskStatuses, title: string) => {
        this.props.changeTitle(this.props.todolistId, id, status, title)
    }
    render() {
        let tasksForTodolist = this.props.tasks[this.props.todolistId]

        // не забывать переприсваивать новое значение переменной tasksForTodolist =
        if (this.props.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
        }
        if (this.props.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
        }
        return (
            <div>
                {tasksForTodolist.map(t => <Task key={t.id}
                                                 task={t}
                                                 removeTask={this.removeTask}
                                                 changeStatus={this.changeTaskStatus}
                                                 changeTaskTitle={this.changeTaskTitle}
                />)}
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