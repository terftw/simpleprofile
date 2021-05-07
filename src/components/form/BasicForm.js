import React, { Component } from 'react';
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropzone from './components/Dropzone';
import Modal from '../Modal';
import { editBasic, editProfilePic, offlineEditBasic } from '../../actions';
import { basicValidation } from '../schemas/FormSchemas';

import './basicForm.css';

class BasicForm extends Component {
    state = {
        isSubmitting: false,
        imagePending: false,
        uploadPrompt: false
    } 

    renderModalContents = () => {
        const onSubmit = async values => {
            if (!this.state.imagePending) {
                this.setState({ isSubmitting: true });
                
                if (this.props.network) {
                    this.props.editBasic(values, this.props.history);
                } else {
                    this.props.offlineEditBasic(values, this.props.history);
                }
                
            } else if (this.state.imagePending) {
                this.setState({ uploadPrompt: true });
            } else {
                this.props.history.push("/");
            }
        }
        const buttonLoad = this.state.isSubmitting ? "loading" : "";
        const pendingSwitch = currState => {
            this.setState({ imagePending: currState});
        }

        const promptSwitchOff = () => {
            this.setState({ uploadPrompt: false });
        }

        return (
            <div>
                <header className="ui dividing header text-header">
                    <h2 className="ui header basic-header">Edit Basic Information</h2>
                    <div className="logo-container">
                        <Link className="closed" to="/">
                            <i className="close icon close-icon" />
                        </Link>
                    </div>
                </header>
                <Form
                    onSubmit={onSubmit}
                    initialValues={this.props.profile}
                    validate={basicValidation}
                    render={({ handleSubmit, submitting }) => (
                        <form className="ui form form-container" onSubmit={handleSubmit}>
                            { this.props.network ? 
                                <Dropzone
                                    online={this.props.network}
                                    image={this.props.profile.profileImage} 
                                    onSubmit={this.props.editProfilePic}
                                    pendingSwitch={pendingSwitch}
                                    uploadPrompt={this.state.uploadPrompt}
                                    promptSwitchOff={promptSwitchOff}
                                />
                                :
                                <div className="offline-display disable-img-upload">
                                    <h3 className="offline-msg">Image upload is disabled when you are offline</h3>
                                </div>
                            }   
                            <div className="field">
                                <label>Name</label>
                                <div className="two fields">
                                    <div className="field">
                                        <Field name="firstName">
                                            {({ input, meta }) => (
                                                <div>
                                                    <input { ...input } type="text" placeholder="First Name" className="form-input" />
                                                    <span className="form-error">{ meta.touched && meta.error }</span>
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                    <div className="field">
                                        <Field name="lastName">
                                                {({ input, meta }) => (
                                                    <div>
                                                        <input { ...input } type="text" placeholder="Last Name" className="form-input" />
                                                        <span className="form-error">{ meta.touched && meta.error }</span>
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
                                            <span className="form-error">{ meta.touched && meta.error }</span>
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
            <div>
                {this.props.profile.length !== 0 && <Modal itemsToRender={this.renderModalContents} />}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return { 
        profile: state.profile,
        network: state.network
    };
}

export default connect(mapStateToProps, { editBasic, editProfilePic, offlineEditBasic })(BasicForm);
