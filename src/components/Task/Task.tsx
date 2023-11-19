import React, {Component} from "react";
import {connect} from "react-redux";
import {AppDispatchThunkType, AppStoreType} from "../../state/store";
import {TaskType} from "../../state/reducers/tasks-reducer";
import style from "./Task.module.css"

type PropsType = {
    tasks: TaskType[]
}

class Task extends Component<PropsType, any> {
    componentDidMount() {
    }

    render() {
        return (
            <div className='task'>
                {
                    this.props.tasks.map(t => {
                        return (
                            <ul key={t.id}>
                                <li className={style.task}>{t.title} <input type="checkbox" /> <button>x</button></li>
                            </ul>
                        )
                    })
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(Task);