import {useFormik} from "formik";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import style from './Login.module.css'
import {validate} from "./validate";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchThunkType, AppStoreType} from "../../state/store";
import {loginTC} from "../../state/reducers/auth-reducer";
import {Navigate} from "react-router-dom";

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginMUI = () => {
    const dispatch = useDispatch<AppDispatchThunkType>()
    const login = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: (values) => {
            dispatch(loginTC(values))
        },
    });
    if (login) {
        return <Navigate to={'/'} />
    }
    return (
        <div>
            <form className={style.login} onSubmit={formik.handleSubmit}>
                <TextField
                    margin="normal"
                    label="Email"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                <TextField
                    margin="normal"
                    label="Password"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password &&  <div style={{color: 'red'}}>{formik.errors.password}</div>}
                <FormControlLabel label={"rememberMe"} control={
                    <Checkbox {...formik.getFieldProps('rememberMe')} />}
                />
                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default LoginMUI;