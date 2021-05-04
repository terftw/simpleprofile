import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import ExperienceForm from './components/ExperienceForm';
import { addWorkExp, addWorkExpPic } from '../../actions';

class AddExperience extends Component {
    state = {
        isSubmitting: false,
        imagePending: false,
        uploadPrompt: false,
        currWorkExperience: {}
    }

    renderModalContents = () => {
        const onSubmit = async values => {
            if (this.state.imagePending) {
                this.setState({ uploadPrompt: true })
            } else {
                const tempArr = this.props.profile.workExperience;
                let finalVals = values;
                if (this.props.logo !== "") {
                    finalVals = { ...values, companyLogo: this.props.logo};
                }
    
                tempArr.push(finalVals)
                this.props.addWorkExp({ workExperience: tempArr }, this.props.history);
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
            <ExperienceForm 
                onSubmit={onSubmit}
                pendingSwitch={pendingSwitch}
                promptSwitchOff={promptSwitchOff}
                uploadPrompt={this.state.uploadPrompt}
                buttonLoad={buttonLoad}
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

export default connect(mapStateToProps, { addWorkExp, addWorkExpPic })(AddExperience);
