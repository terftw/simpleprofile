import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import ExperienceForm from './components/ExperienceForm';
import { addWorkExp, addWorkExpPic } from '../../actions';

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
                const newWorkExperience = this.props.profile.workExperience;
                let finalVals = values;
                if (this.props.logo !== "") {
                    finalVals = { ...values, companyLogo: this.props.logo};
                }
    
                newWorkExperience.splice(this.props.match.params.entry, 1, finalVals);
                this.props.addWorkExp({ workExperience: newWorkExperience }, this.props.history);
            } 
        }
        const deleteRequest = event => {
            const newWorkExperience = this.props.profile.workExperience;
            newWorkExperience.splice(this.props.match.params.entry, 1);

            this.props.addWorkExp({ workExperience: newWorkExperience }, this.props.history);

            event.preventDefault();
        }
        const buttonLoad = this.state.isSubmitting ? "loading" : "";
        const pendingSwitch = currState => { this.setState({ imagePending: currState}) }
        const promptSwitchOff = () => { this.setState({ uploadPrompt: false }) }
    
        return ( 
            <ExperienceForm 
                onSubmit={onSubmit}
                currWorkExperience={this.props.profile.workExperience[this.props.match.params.entry]}
                pendingSwitch={pendingSwitch}
                promptSwitchOff={promptSwitchOff}
                uploadPrompt={this.state.uploadPrompt}
                buttonLoad={buttonLoad}
                enableDelete
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
        profile: state.profile
     };
}

export default connect(mapStateToProps, { addWorkExp, addWorkExpPic })(EditExperience);
