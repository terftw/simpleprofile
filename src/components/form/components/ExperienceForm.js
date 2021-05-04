import React, { Component } from 'react';
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom';

import Options from './Options';
import { monthOptions, yearOptions } from './DateTime';
import { expValidation } from '../../schemas/FormSchemas';
import Dropzone from '../components/Dropzone';

import './experienceForm.css';

class ExperienceForm extends Component {

    state = { summonDelete: false}

    startDelete = event => {
        this.setState({ summonDelete: true });
        event.preventDefault();
    }

    resetDelete = event => {
        this.setState({ summonDelete: false });
        event.preventDefault();
    }

    renderForm() {
        return (
            <div>
                <header className="ui dividing header basic-header">
                    <h2 className="ui header">Add Work Experience</h2>
                    <Link className="closed" to="/">
                        <i className="close icon close-icon" />
                    </Link>
                </header>
                <Form
                    onSubmit={this.props.onSubmit}
                    validate={expValidation}
                    initialValues={this.props.currWorkExperience}
                    render={({ handleSubmit, submitting }) => (
                        <form className="ui form testclass" onSubmit={handleSubmit}>
                            <Dropzone
                                image={this.props.logo}
                                onLogoUpload={this.props.addWorkExpPic}
                                pendingSwitch={this.props.pendingSwitch}
                                uploadPrompt={this.props.uploadPrompt}
                                promptSwitchOff={this.props.promptSwitchOff}
                            />
                            <div className="field">
                                <label>Company</label>
                                <Field name="company">
                                    {({ input, meta }) => (
                                        <div>
                                            <input { ...input } type="text" placeholder="Company" className="form-input" />
                                            <span className="form-error">{ meta.error && meta.touched && meta.error }</span>
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
                                            <span className="form-error">{ meta.error && meta.touched && meta.error }</span>
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
                                                            selectedValue={input.value}
                                                            onChange={(value) => input.onChange(value)}
                                                        />
                                                        <span className="form-error">{ (meta.modified || meta.submitFailed) ? meta.error: "" }</span>
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
                                                            selectedValue={input.value}
                                                            isYear
                                                            onChange={(value) => input.onChange(value)}
                                                        />
                                                        <span className="form-error">{ (meta.modified || meta.submitFailed) ? meta.error: "" }</span>
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
                                                            selectedValue={input.value}
                                                            onChange={(value) => input.onChange(value)}
                                                        />
                                                        <span className="form-error">{ (meta.modified || meta.submitFailed) ? meta.error: "" }</span>
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
                                                            selectedValue={input.value}
                                                            isYear
                                                            onChange={(value) => input.onChange(value)}
                                                        />
                                                        <span className="form-error">{ (meta.modified || meta.submitFailed) ? meta.error: "" }</span>
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
                                            <span className="form-error">{ meta.error && meta.touched && meta.error }</span>
                                        </div>
                                    )}
                                </Field>
                            </div>
                            { this.props.enableDelete && 
                                <button
                                    className="ui red button"
                                    onClick={(event) => this.startDelete(event)}
                                >
                                    Delete
                                </button>
                            
                            } 
                            <button 
                                className={`ui green button ${this.props.buttonLoad}`} 
                                type="submit"
                                disabled={submitting}
                            >
                                Add Experience
                            </button>
                        </form>
                    )}
                />
            </div>
        )
    }
    
    renderDeleteConfirmation() {
        return (
            <div>
                <header className="ui dividng header basic-header">
                    <h2 className="ui header">Confirm delete work experience</h2>
                    <Link className="closed" to="/">
                        <i className="close icon close-icon" />
                    </Link>
                </header>
                <div className="ui text container testclass">
                    <h4>Delete si bo? Wa scary leh, you confirm delete?</h4>
                    <button 
                        className="ui red button"
                        onClick={event => this.props.deleteRequest(event)}
                    >
                        Delete
                    </button>
                    <button 
                        className="ui button"
                        onClick={event => this.resetDelete(event)}
                    >
                        Go Back
                    </button>
                </div>
            </div>

        )
    }

    render() {  
        return (
            <div>
                {this.state.summonDelete ? this.renderDeleteConfirmation()  : this.renderForm()}
            </div>
        )
    }
}

export default ExperienceForm;
