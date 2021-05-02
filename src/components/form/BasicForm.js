import React, { Component } from 'react';
import _ from 'lodash';
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Modal from '../Modal';
import { editBasic } from '../../actions';
import './basicForm.css';

class BasicForm extends Component {
    state = {
        isSubmitting: false
    }

    renderModalContents = () => {
        const onSubmit = async values => {
            if (!_.isEqual(this.props.profile, values)) {
                this.setState({ isSubmitting: true });
                this.props.editBasic(values, this.props.history);
            } else {
                this.props.history.push("/");
            }
        }
        const buttonLoad = this.state.isSubmitting ? "loading" : "";
        return (
            <div>
                <header className="ui segment basic-header">
                    <h2>Edit basic information</h2>
                    <Link className="closed" to="/">
                        <i className="close icon close-icon" />
                    </Link>
                </header>
                <Form
                    onSubmit={onSubmit}
                    initialValues={this.props.profile}
                    render={({ handleSubmit, values }) => (
                        <form className="ui form testclass" onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Name</label>
                                <div className="two fields">
                                    <div className="field">
                                        <Field name="firstName">
                                            {({ input }) => (
                                                <input type="text" placeholder="First Name" {...input} />
                                            )}
                                        </Field>
                                    </div>
                                    <div className="field">
                                        <Field name="lastName">
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
                            <button className={`ui primary button ${buttonLoad}`} type="submit">Submit</button>
                        </form>
                    )}
                />
            </div>
        );
    }

    render() {
        return (
            <Modal itemsToRender={this.renderModalContents}/>
        )
    }
};

const mapStateToProps = state => {
    return { profile: state.profile };
}

export default connect(mapStateToProps, { editBasic })(BasicForm);
