import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import ExperienceForm from './components/ExperienceForm';
import { addWorkExp, addWorkExpPic, offlineAddWorkExp } from '../../actions';

class EditExperience extends Component {
    state = {
        isSubmitting: false,
        imagePending: false,
        uploadPrompt: false,
    }
    
    renderModalContents = () => {
        const onSubmit = async values => {
            if (this.state.imagePending) {
                this.setState({ uploadPrompt: true })
            } else {
                const newWorkExperience = [...this.props.profile.workExperience];
                let finalVals = values;
                if (this.props.logo !== "") {
                    finalVals = { ...values, companyLogo: this.props.logo};
                }

                if (values.isCurrentJob) {
                    const emptyEndDate = {
                        endMonth: "",
                        endYear: ""
                    };
                    finalVals = { ...finalVals,  ...emptyEndDate};
                }
    
                newWorkExperience.splice(this.props.match.params.entry, 1, finalVals);
                
                if (this.props.network) {
                    this.props.addWorkExp({ workExperience: newWorkExperience }, this.props.history);
                } else {
                    this.props.offlineAddWorkExp({ workExperience: newWorkExperience }, this.props.history);
                } 
            } 
        }
        const deleteRequest = event => {
            const newWorkExperience = [...this.props.profile.workExperience];
            newWorkExperience.splice(this.props.match.params.entry, 1);

            this.props.addWorkExp({ workExperience: newWorkExperience }, this.props.history);
            event.preventDefault();
        }
        const jobIndexWithCurrentJob = this.props.profile.workExperience.filter(item => item.isCurrentJob)[0];
        const buttonLoad = this.state.isSubmitting ? "loading" : "";
        const pendingSwitch = currState => { this.setState({ imagePending: currState}) }
        const promptSwitchOff = () => { this.setState({ uploadPrompt: false }) }
    
        return ( 
            <ExperienceForm 
                onSubmit={onSubmit}
                currWorkExperience={this.props.profile.workExperience[this.props.match.params.entry]}
                jobIndexWithCurrentJob={jobIndexWithCurrentJob}
                pendingSwitch={pendingSwitch}
                promptSwitchOff={promptSwitchOff}
                uploadPrompt={this.state.uploadPrompt}
                buttonLoad={buttonLoad}
                isEdit
                deleteRequest={deleteRequest}
                { ...this.props }
            />
        )
    }

    render() {
        return (
            <div>
                {this.props.profile.length !== 0 && <Modal itemsToRender={this.renderModalContents}/>}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return { 
        logo: state.logo,
        profile: state.profile,
        network: state.network
     };
}

export default connect(mapStateToProps, { addWorkExp, addWorkExpPic, offlineAddWorkExp })(EditExperience);
