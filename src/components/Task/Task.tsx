import React, {ChangeEvent, Component} from "react";
import {TaskStatuses, TaskType} from "../../state/reducers/tasks-reducer";
import EditableSpan from "../EditableSpan";

type PropsType = {
    task: TaskType
    removeTask: (id: string) => void
    changeStatus: (taskId: string, status: TaskStatuses, title: string) => void
    changeTaskTitle: (taskId: string, status: TaskStatuses, title: string) => void
}

class Task extends Component<PropsType, any> {
    render() {
        const {task, removeTask, changeStatus, changeTaskTitle} = this.props

        const onRemoveTask = () => {
            removeTask(task.id)
        }
        const onChangHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            changeStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, task.title)
        }
        const onUpdate = (newTitle: string) => {
            changeTaskTitle(task.id, task.status, newTitle)
        }
        const isDone = this.props.task.status === TaskStatuses.Completed
        return (
            <div className="task">
                <EditableSpan value={this.props.task.title} onUpdate={(newTitle) => onUpdate(newTitle)} />
                <input checked={isDone} onChange={onChangHandler} type="checkbox"/>
                <button onClick={onRemoveTask}>x</button>
            </div>
        );
    }
}

export default Task;