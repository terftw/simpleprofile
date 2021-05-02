import React, { Component } from 'react';
import { Form, Field } from 'react-final-form'

import './form.css';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

class Root extends Component {
    render() {
        return (
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, values }) => (
                    <form className="ui form testclass" onSubmit={handleSubmit}>
                        <div className="field">
                            <label>Name</label>
                            <div className="two fields">
                                <div className="field">
                                    <Field name="firstname">
                                        {({ input }) => (
                                            <input type="text" placeholder="First Name" {...input} />
                                        )}
                                    </Field>
                                </div>
                                <div className="field">
                                    <Field name="lastname">
                                            {({ input }) => (
                                                <input type="text" placeholder="Last Name" {...input} />
                                            )}
                                    </Field>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Age</label>
                            <Field name="age">
                                {({ input }) => (
                                    <input type="text" placeholder="Age" {...input} />
                                )}
                            </Field>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                )}
            />
        );
    }
};

export default Root;
