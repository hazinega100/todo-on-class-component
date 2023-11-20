import {ChangeEvent, Component} from "react";

type PropsType = {
    // value: string
    addItem: (value: string) => void
}

class AddItemForm extends Component<PropsType, any>{
    state = {
        title: ''
    }
    render() {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            this.setState({
                title: e.currentTarget.value
            })
        }
        const onClickHandler = () => {
            this.props.addItem(this.state.title)
        }
        return (
            <div>
                <input value={this.state.title} onChange={onChangeHandler}/>
                <button onClick={onClickHandler}>+</button>
            </div>
        )
    }
}

export default AddItemForm