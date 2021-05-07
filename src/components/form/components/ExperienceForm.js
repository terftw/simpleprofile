import React, { Component } from 'react';
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import Options from './Options';
import { monthOptions, yearOptions } from './DateTime';
import { expValidation } from '../../schemas/FormSchemas';
import { DEFAULT_PIC } from '../../../constants/ProfileConstants';
import Dropzone from '../components/Dropzone';

import './experienceForm.css';

class ExperienceForm extends Component {

    state = { 
        summonDelete: false,
    }

    startDelete = event => {
        this.setState({ summonDelete: true });
        event.preventDefault();
    }

    resetDelete = event => {
        this.setState({ summonDelete: false });
        event.preventDefault();
    }

    showImage = () => {
        let imageLink = this.props.isEdit ? this.props.currWorkExperience && this.props.currWorkExperience.companyLogo : DEFAULT_PIC;
        return this.props.logo === "" ? imageLink : this.props.logo;
    }

    renderForm() {
        return (
            <div>
                <header className="ui dividing header text-header">
                    <h2 className="basic-header">{this.props.isEdit ? "Edit Work Experience" : "Add Work Experience"}</h2>
                    <div className="logo-container">
                        <Link className="closed" to="/">
                            <i className="close icon close-icon" />
                        </Link>
                    </div>
                </header>
                <Form
                    onSubmit={this.props.onSubmit}
                    validate={expValidation}
                    initialValues={this.props.currWorkExperience}
                    render={({ handleSubmit, submitting, values }) => (
                        <form className="ui form form-container" onSubmit={handleSubmit}>
                            { this.props.online ?
                                <Dropzone
                                    online={this.props.online}
                                    image={this.showImage()}
                                    onLogoUpload={this.props.addWorkExpPic}
                                    pendingSwitch={this.props.pendingSwitch}
                                    uploadPrompt={this.props.uploadPrompt}
                                    promptSwitchOff={this.props.promptSwitchOff}
                                />
                                :
                                <div className="offline-display disable-img-upload">
                                    <h3 className="offline-msg">Image upload is disabled when you are offline</h3>
                                </div>
                            }
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
                                <div className="ui checkbox">
                                    <Field 
                                        name="isCurrentJob"
                                        component="input"
                                        type="checkbox"
                                    />                       
                                    <label>I am currently working in this role</label>
                                </div>
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
                            {!values.isCurrentJob && 
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
                            }
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
                            <div className="button-container">
                                { this.props.isEdit && 
                                    <button
                                        className="ui red button"
                                        onClick={(event) => this.startDelete(event)}
                                        disabled={this.props.isSubmitting || this.props.uploadPrompt}
                                    >
                                        Delete
                                    </button>
                                } 
                                <button 
                                    className={`ui green button ${this.props.buttonLoad}`} 
                                    type="submit"
                                    disabled={submitting || this.props.uploadPrompt}
                                >
                                    {this.props.isEdit ? "Edit" : "Add"}
                                </button>
                            </div>
                        </form>
                    )}
                />
            </div>
        )
    }
    
    renderDeleteConfirmation() {
        return (
            <Rodal visible={this.state.summonDelete} onClose={this.resetDelete}>
                <div className="delete-confirm">
                    <header className="ui dividng header basic-header">
                        <h2 className="ui header">Deleting experience</h2>
                    </header>
                    <div className="ui divider"></div>
                    <div className="del-container">
                        <h3 className="del-text">Are you sure you want to delete this position?</h3>
                        <div className="ui divider"></div>
                        <div className="del-button-container">
                            <button 
                                className="ui button"
                                onClick={event => this.resetDelete(event)}
                            >
                                Go Back
                            </button>
                            <button 
                                className="ui red button"
                                onClick={event => this.props.deleteRequest(event)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Rodal>

        )
    }

    render() {  
        return (
            <div>
                {this.renderDeleteConfirmation()}
                {this.renderForm()}
            </div>
        )
    }
}

export default ExperienceForm;
