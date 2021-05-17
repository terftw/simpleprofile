import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingSpinner from '../spinner/LoadingSpinner';
import { INITIAL, RECONNECTION_SUCCESS, RECONNECTION_FAIL } from '../../constants/ProfileConstants';
import { fetchProfile, retrySubmit, tryingResubmit } from '../../actions';
import './profile.css';
import placeholder from '../../images/placeholder.png';

class Profile extends Component {
    state = {
        hasReconnected: INITIAL,
    }

    retryDisplayMsg = () => {
        switch(this.state.hasReconnected) {
            case INITIAL:
            case RECONNECTION_FAIL:
                return "You are currently offline 😞";
            case RECONNECTION_SUCCESS:
                return "Yay! You are back on! 😃Your local changes have been submitted successfully";
            default:
                return "Something is wrong"
        }
    }
    retryDisplayButtonMsg = () => {
        switch(this.state.hasReconnected) {
            case INITIAL:
            case RECONNECTION_FAIL:
                return "Submit current changes";
            case RECONNECTION_SUCCESS:
                return "Dismiss";
            default:
                return "Something is wrong"
        }
    }
    retryDisplayColor = () => {
        switch(this.state.hasReconnected) {
            case INITIAL:
            case RECONNECTION_FAIL:
                return "red";
            case RECONNECTION_SUCCESS:
                return "green";
            default:
                return "Something is wrong"
        }
    }
    borderColor = () => {
        switch(this.state.hasReconnected) {
            case INITIAL:
            case RECONNECTION_FAIL:
                return "red-border";
            case RECONNECTION_SUCCESS:
                return "green-border";
            default:
                return "Something is wrong"
        }
    }
    isLoading = () => { return this.props.offline ? "loading" : null; }
    activateRetryButton = event => {
        this.props.tryingResubmit();
        if (this.state.hasReconnected !== RECONNECTION_SUCCESS) {
            this.props.retrySubmit(this.props.profile);
        } else {
            this.setState({ hasReconnected: INITIAL });
        }
        
        event.preventDefault()
    }
    componentDidMount() {
        this.props.fetchProfile();
    }
    componentDidUpdate(prevProps, prevState) {
         if (!prevProps.network && this.props.network) {
            this.setState({ hasReconnected: RECONNECTION_SUCCESS, reconnectButtonIsLoading: false });
        } else if (prevProps.network && !this.props.network) {
            if (this.state.hasReconnected === INITIAL) {
                this.setState({ hasReconnected: RECONNECTION_FAIL });
            }
        }
    }
    renderList = () => {
        return this.props.profile.length !== 0 && this.props.profile.workExperience.map((item, index, arr) => {
            const endMonthString = item.isCurrentJob ? "Present" :`${item.endMonth} ${item.endYear}`;

            return (
                <div key={index}>
                    <div className="job-item-segment">
                        <div className="job-item">
                            <div className="company-logo">
                                <div className="company-logo-container">
                                    <img className="logo" src={this.props.network ? item.companyLogo : placeholder} alt="company logo"/>
                                </div>
                            </div>
                            <div>
                                <h3 className="job-title">{item.jobTitle}</h3>
                                <h4>{item.company}</h4>
                                <h5>{`${item.startMonth} ${item.startYear} - ${endMonthString}`}</h5>
                                <div>
                                    <pre className="job-description">{item.jobDescription}</pre>
                                </div>
                            </div>
                        </div>
                        <div className="exp-logo">
                            <div className="logo-container">
                                <Link to={`/experience_edit/${index}`}>
                                    <i className="pencil icon add-icon"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {arr.length - 1 === index ? null : <div className="ui divider divide"></div>}
                </div>
            )
        })
    }
    renderMain() {
        const { profile } = this.props;

        return (
            <div>
                <div className="ui pointing menu">
                    <div className="ui container">
                    </div>
                </div> 
                <div className="ui main text container add-margin">
                    {this.state.hasReconnected !== INITIAL && 
                        <div className={`offline-display ${this.borderColor()}`}>
                            <h3 className="offline-msg">{this.retryDisplayMsg()}</h3>
                            <button 
                                className={`ui button ${this.retryDisplayColor()} ${this.isLoading()} offline-button`} 
                                onClick={this.activateRetryButton}
                                disabled={this.props.offline}
                            >
                                {this.retryDisplayButtonMsg()}
                            </button>
                        </div>
                    }
                    <div className="first-segment ui segment">
                        <div className="flex-row">
                            <div className="profile-pic-container">
                                <img className="profile-pic " src={profile.profileImage.preview ? profile.profileImage.preview : profile.profileImage} alt="profile" />
                            </div>
                            <div className="text-segment">
                                <h1>{`${profile.firstName} ${profile.lastName}, ${profile.age}`}</h1>
                            </div>
                            <div className="basic-logo">
                                <div className="logo-container">
                                    <Link to="/basic_edit">
                                        <i className="pencil icon add-icon"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className="ui segment">
                        <header className="experience-container">
                            <h2 className="experience-title">Work Experience</h2>
                            <div className="basic-logo">
                                <div className="logo-container" >
                                    <Link to="/experience_add">
                                        <i className="plus icon add-icon" />
                                    </Link>
                                </div>
                            </div>
                        </header>  
                        <div className="experience-list">
                            {this.renderList()}
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
    render() {
        return (
            <div>
                {this.props.profile.length === 0 ? <LoadingSpinner /> : this.renderMain()}
            </div>            
        )
    }
}

const mapStateToProps = state => {
    return { 
        profile: state.profile,
        network: state.network,
        offline: state.offline
    };
}

export default connect(mapStateToProps, { fetchProfile, retrySubmit, tryingResubmit })(Profile);
