import * as React from 'react';
import {Component} from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {connect} from "react-redux";
import {setAppErrorAC, setAppSuccessAC} from "../../state/reducers/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type PropsType = {
    error: null | string
    success: null | string
    setAppErrorAC: (error: null | string[]) => void
    setAppSuccessAC: (success: null | string[]) => void
}

class Snackbars extends Component<PropsType , any> {
    handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.setAppErrorAC(null)
        this.props.setAppSuccessAC(null)
    };
    render() {
        const isOpenError = this.props.error !== null
        const isOpenSuccess = this.props.success !== null
        if (this.props.error) {
            return (
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={isOpenError} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="error" sx={{ width: '100%' }}>
                            {this.props.error}
                        </Alert>
                    </Snackbar>
                </Stack>
            );
        }
        if (this.props.success) {
            return (
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={isOpenSuccess} autoHideDuration={3000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
                            {this.props.success}
                        </Alert>
                    </Snackbar>
                </Stack>
            );
        }
    }
}

const mapStateToProps = (state: { app: { error: string | null, success: string | null } }) => {
    return {
        error: state.app.error,
        success: state.app.success
    }
}

export default connect(mapStateToProps, {setAppErrorAC, setAppSuccessAC})(Snackbars)