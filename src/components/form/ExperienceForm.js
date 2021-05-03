import React, { Component } from 'react';
import _ from 'lodash';
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Modal from '../Modal';
import Dropzone from './Dropzone';
import { editBasic, editProfilePic } from '../../actions';
import Options from './options/Options';
import { monthOptions, yearOptions } from './datetime/DateTime';
import { validation } from '../schemas/BasicFormSchema';

import './basicForm.css';

class ExperienceForm extends Component {
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
                    <h2>Add Work Experience</h2>
                    <Link className="closed" to="/">
                        <i className="close icon close-icon" />
                    </Link>
                </header>
                <Form
                    onSubmit={onSubmit}
                    validate={validation}
                    render={({ handleSubmit, submitting, values }) => (
                        <form className="ui form testclass" onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Company</label>
                                <Field name="company">
                                    {({ input, meta }) => (
                                        <div>
                                            <input { ...input } type="text" placeholder="Company" className="form-input" />
                                            <span className="form-error">{ meta.error }</span>
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="field">
                                <label>Job Title</label>
                                <Field name="jobTitle">
                                    {({ input, meta }) => (
                                        <div>
                                            <input { ...input } type="text" placeholder="Job Title" className="form-input" />
                                            <span className="form-error">{ meta.error }</span>
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="field">
                                <label>Start Date</label>
                                <div className="two fields">
                                    <div className="field">
                                        <Field name="startMonth" options={monthOptions}>
                                            {({ input, meta, options }) => {
                                                return (
                                                    <div>
                                                        <Options
                                                            options={options}
                                                            name={input.name}
                                                            onChange={(value) => input.onChange(value)}
                                                        />
                                                        <span className="form-error">{ meta.error }</span>
                                                    </div>   
                                                )
                                            }}
                                        </Field>
                                    </div>
                                    <div className="field">
                                        <Field name="startYear" options={yearOptions}>
                                            {({ input, meta, options }) => {
                                                return (
                                                    <div>
                                                        <Options
                                                            options={options}
                                                            name={input.name}
                                                            isYear
                                                            onChange={(value) => input.onChange(value)}
                                                        />
                                                        <span className="form-error">{ meta.error }</span>
                                                    </div>   
                                                )
                                            }}
                                        </Field>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label>End Date</label>
                                <div className="two fields">
                                    <div className="field">
                                        <Field name="endMonth" options={monthOptions}>
                                            {({ input, meta, options }) => {
                                                return (
                                                    <div>
                                                        <Options
                                                            options={options}
                                                            name={input.name}
                                                            onChange={(value) => input.onChange(value)}
                                                        />
                                                        <span className="form-error">{ meta.error }</span>
                                                    </div>   
                                                )
                                            }}
                                        </Field>
                                    </div>
                                    <div className="field">
                                        <Field name="endYear" options={yearOptions}>
                                            {({ input, meta, options }) => {
                                                return (
                                                    <div>
                                                        <Options
                                                            options={options}
                                                            name={input.name}
                                                            isYear
                                                            onChange={(value) => input.onChange(value)}
                                                        />
                                                        <span className="form-error">{ meta.error }</span>
                                                    </div>   
                                                )
                                            }}
                                        </Field>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label>Job Description</label>
                                <Field name="jobDescription">
                                    {({ input, meta }) => (
                                        <div>
                                            <textarea { ...input } placeholder="Tell us more about your job experiences" className="form-input" />
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
                                Add Experience
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

export default connect(mapStateToProps, { editBasic, editProfilePic })(ExperienceForm);
