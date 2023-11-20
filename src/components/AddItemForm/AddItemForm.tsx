import {Component} from "react";

type PropsType = {

}

class AddItemForm extends Component<PropsType, any>{
    render() {
        return (
            <div>
                <input /><button>+</button>
            </div>
        )
    }
}

export default AddItemForm