import React, {Component} from "react";
import {FilterType, TodolistType} from "../state/reducers/todolist-reducer";
import {Dispatch} from "redux";
import {connect} from "react-redux";

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
            <div>
                <h3>{this.props.title}</h3>
                <div>
                    <button>All</button>
                    <button>Complete</button>
                    <button>Active</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: TodolistType[]) => {
    return {
        data: state
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);