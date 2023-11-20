import React, {Component} from "react";
import {connect} from "react-redux";
import {AppDispatchThunkType} from "../../state/store";
import {getTasksTC, TaskType} from "../../state/reducers/tasks-reducer";
import Task from "./Task";

type PropsType = {
    tasks: TaskType[]
    todolistId: string
    getTasks: (todolistId: string) => void
}

class TasksContainer extends Component<PropsType, any> {
    componentDidMount() {
        this.props.getTasks(this.props.todolistId)
    }

    render() {
        const removeTask = (id: string) => {
            console.log(`removed task: ${id}`)
        }
        return (
            <div>
                {this.props.tasks.map(t => <Task key={t.id} task={t} removeTask={removeTask} />)}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: AppDispatchThunkType) => {
    return {
        getTasks(todolistId: string) {
            dispatch(getTasksTC(todolistId))
        }
    }
}

export default connect(null, mapDispatchToProps)(TasksContainer);