import {ChangeEvent, Component} from "react";

type PropsType = {
    addItem: (value: string) => void
}

class AddItemForm extends Component<PropsType, any>{
    state = {
        title: ''
    }
    render() {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value
            this.setState({
                title: value
            })
        }
        const onClickHandler = () => {
            if (this.state.title !== '') {
                this.props.addItem(this.state.title.trim())
            }
            this.setState({
                title: ''
            })
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