import { monthStringToNum } from '../form/components/DateTime';

const basicValidation = values => {
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

const expValidation = values => {
    const errors = {}
    if (!values.company) {
        errors.company = 'Required';
    }
    if (!values.jobTitle) {
        errors.jobTitle = 'Required';
    }
    if (!values.startMonth) {
        errors.startMonth = 'Required';
    }
    if (!values.startYear) {
        errors.startYear = 'Required';
    }
    if (!values.endMonth) {
        errors.endMonth = 'Required';
    }
    if (!values.endYear) {
        errors.endYear = 'Required';
    }
    if (values.startMonth && values.startYear) {
        let startTime = new Date(values.startYear, monthStringToNum[values.startMonth]);
        console.log(startTime);
        if (new Date() < startTime) {
            console.log('error');
            errors.startMonth = `Start date can't be past today's date`;
        }
    }
    if (values.endMonth && values.endYear) {
        let endTime = new Date(values.endYear, monthStringToNum[values.endMonth]);

        if (new Date() < endTime) {
            errors.endMonth = `End date can't be past today's date`;
        }
    }

    if (values.startMonth && values.startYear && values.endMonth && values.endYear) {
        let startTime =  new Date(values.startYear, monthStringToNum[values.startMonth]);
        let endTime =  new Date(values.endYear, monthStringToNum[values.endMonth]);

        if (endTime < startTime) {
            errors.endMonth = `Your end date can't be earlier than your start date`;
        }
    }

    return errors
}

export {
  basicValidation,
  expValidation
}
