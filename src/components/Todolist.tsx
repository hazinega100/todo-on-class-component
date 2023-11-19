import React, {Component} from "react";
import {FilterType} from "../state/reducers/todolist-reducer";
import {connect} from "react-redux";
import {AppDispatchThunkType, AppStoreType} from "../state/store";
import Task from "./Task";

type PropsType = {
    id: string
    title: string
    filter: FilterType
}

class Todolist extends Component<PropsType, any> {
    componentDidMount() {
    }

    render() {
        return (
            <div className='todolist'>
                <h3>{this.props.title}</h3>
                <div className='btn_wrapper'>
                    <Task />
                    <button>All</button>
                    <button>Complete</button>
                    <button>Active</button>
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