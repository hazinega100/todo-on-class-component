type ValidateType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const validate = (values: any) => {
    let errors: ValidateType = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Need more 6 symbols';
    }


    return errors;
};