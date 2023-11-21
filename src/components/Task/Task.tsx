import React, {ChangeEvent, Component} from "react";
import {TaskStatuses, TaskType} from "../../state/reducers/tasks-reducer";
import style from "./Task.module.css"

type PropsType = {
    task: TaskType
    removeTask: (id: string) => void
    changeStatus: (taskId: string, status: TaskStatuses, title: string) => void
}

class Task extends Component<PropsType, any> {
    render() {
        const {task, removeTask, changeStatus} = this.props

        const onRemoveTask = () => {
            removeTask(task.id)
        }
        const onChangHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            changeStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, task.title)
        }
        const isDone = this.props.task.status === TaskStatuses.Completed
        return (
            <div className='task'>
                <span className={style.task}>
                    {this.props.task.title}
                    <input checked={isDone} onChange={onChangHandler} type="checkbox"/>
                    <button onClick={onRemoveTask}>x</button>
                </span>
            </div>
        );
    }
}

export default Task;