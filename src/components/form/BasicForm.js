import React, { Component } from 'react';
import _ from 'lodash';
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropzone from './Dropzone';
import Modal from '../Modal';
import { editBasic, editProfilePic } from '../../actions';
import { validation } from '../schemas/BasicFormSchema';

import './basicForm.css';

class BasicForm extends Component {
    state = {
        isSubmitting: false,
        imageFail: false
    }

    renderModalContents = () => {
        const onSubmit = async values => {
            if (!_.isEqual(this.props.profile, values) && !this.state.imageFail) {
                console.log('updating')
                this.setState({ isSubmitting: true });
                this.props.editBasic(values, this.props.history);
            } else {
                this.props.history.push("/");
            }
        }
        const buttonLoad = this.state.isSubmitting ? "loading" : "";
        const imageOk = () => {
            this.setState({ imageFail: false});
        }
        const imageNotOk = () => {
            this.setState({ imageFail: true });
        }

        return (
            <div>
                <header className="ui segment basic-header">
                    <h2>Edit Basic Information</h2>
                    <Link className="closed" to="/">
                        <i className="close icon close-icon" />
                    </Link>
                </header>
                <Form
                    onSubmit={onSubmit}
                    initialValues={this.props.profile}
                    validate={validation}
                    render={({ handleSubmit, submitting }) => (
                        <form className="ui form testclass" onSubmit={handleSubmit}>
                            <Dropzone 
                                image={this.props.profile.profileImage} 
                                onSubmit={this.props.editProfilePic}
                                imageOk={imageOk}
                                imageNotOk={imageNotOk}
                            />
                            <div className="field">
                                <label>Name</label>
                                <div className="two fields">
                                    <div className="field">
                                        <Field name="firstName">
                                            {({ input, meta }) => (
                                                <div>
                                                    <input { ...input } type="text" placeholder="First Name" className="form-input" />
                                                    <span className="form-error">{ meta.error }</span>
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                    <div className="field">
                                        <Field name="lastName">
                                                {({ input, meta }) => (
                                                    <div>
                                                        <input { ...input } type="text" placeholder="Last Name" className="form-input" />
                                                        <span className="form-error">{ meta.error }</span>
                                                    </div>
                                                )}
                                        </Field>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label>Age</label>
                                <Field name="age">
                                    {({ input, meta }) => (
                                        <div>
                                            <input { ...input } type="text" placeholder="Age" className="form-input" />
                                            <span className="form-error">{ meta.error }</span>
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <button 
                                className={`ui green button ${buttonLoad}`} 
                                type="submit"
                                disabled={submitting}
                            >
                                Submit
                            </button>
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

export default connect(mapStateToProps, { editBasic, editProfilePic })(BasicForm);
