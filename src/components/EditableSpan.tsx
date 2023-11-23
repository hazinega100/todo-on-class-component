import React, { ChangeEvent, KeyboardEvent } from 'react';

interface EditableSpanProps {
    value: string;
    onUpdate: (newTitle: string) => void;
}

interface EditableSpanState {
    editMode: boolean;
    inputText: string;
}

class EditableSpan extends React.Component<EditableSpanProps, EditableSpanState> {
    constructor(props: EditableSpanProps) {
        super(props);

        this.state = {
            editMode: false,
            inputText: this.props.value,
        };
    }

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputText: e.target.value });
    };

    handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.saveChanges();
        }
    };

    handleSpanClick = () => {
        this.setState({ editMode: true });
    };

    saveChanges = () => {
        const { inputText } = this.state;
        this.props.onUpdate(inputText);
        this.setState({ editMode: false });
    };

    render() {
        const { value } = this.props;
        const { editMode, inputText } = this.state;

        return (
            <div>
                {editMode ? (
                    <input
                        type="text"
                        value={inputText}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        onBlur={this.saveChanges}
                        autoFocus
                    />
                ) : (
                    <span onDoubleClick={this.handleSpanClick}>{value}</span>
                )}
            </div>
        );
    }
}

export default EditableSpan;
