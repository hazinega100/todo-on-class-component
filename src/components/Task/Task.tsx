import React, {Component} from "react";
import {TaskType} from "../../state/reducers/tasks-reducer";
import style from "./Task.module.css"

type PropsType = {
    task: TaskType
    removeTask: (id: string) => void
}

class Task extends Component<PropsType, any> {
    render() {
        const {task, removeTask} = this.props

        const onRemoveTask = () => {
            removeTask(task.id)
        }
        return (
            <div className='task'>
                <span className={style.task}>
                    {this.props.task.title}
                    <input type="checkbox"/>
                    <button onClick={onRemoveTask}>x</button>
                </span>
            </div>
        );
    }
}

export default Task;