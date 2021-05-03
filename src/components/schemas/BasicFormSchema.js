const validation = values => {
    const errors = {}
        if (!values.firstName) {
            errors.firstName = 'Required';
        }
        if (!values.lastName) {
            errors.lastName = 'Required';
        }
        if (!values.age) {
            errors.age = 'Required'
        } else if (values.age < 18) {
            errors.age = 'Must be at least 18';
        } else if (isNaN(values.age)) {
            errors.age = 'Must be a number';
        }

    return errors
}

export {
  validation
}
