import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import ExperienceForm from './components/ExperienceForm';
import { addWorkExp, addWorkExpPic, offlineAddWorkExp } from '../../actions';
import { DEFAULT_PIC } from '../../constants/ProfileConstants';
import { timeSort } from './components/DateTime';

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
                const tempArr = [ ...this.props.profile.workExperience ];
                let finalVals = values;
                if (this.props.logo !== "") {
                    finalVals = { ...values, companyLogo: this.props.logo};
                } else {
                    finalVals = { ...values, companyLogo: DEFAULT_PIC };
                }
                
                tempArr.push(finalVals)
                const sortedExps = timeSort(tempArr);
                if (this.props.network) {
                    this.props.addWorkExp({ workExperience: sortedExps }, this.props.history);
                } else {
                    this.props.offlineAddWorkExp({ workExperience: sortedExps }, this.props.history);
                }
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
                online={this.props.network}
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
        profile: state.profile,
        network: state.network
     };
}

export default connect(mapStateToProps, { addWorkExp, addWorkExpPic, offlineAddWorkExp })(AddExperience);
