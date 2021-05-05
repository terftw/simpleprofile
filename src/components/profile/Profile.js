import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingSpinner from '../spinner/LoadingSpinner';
import { fetchProfile, retrySubmit } from '../../actions';
import './profile.css';

class Profile extends Component {
    componentDidMount() {
        this.props.fetchProfile();
    }

    retryProfileSubmit = event => {
        this.props.retrySubmit(this.props.profile);
        event.preventDefault()
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
                                    <img className="logo" src={item.companyLogo} alt="company logo"/>
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
                {console.log(this.props.network)}
                <div className="ui pointing menu">
                    <div className="ui container">
                        <a href="#" className="header item">Test 1</a>
                        <a href="#" className="item">Test 2</a>
                        <a href="#" className="item">Test 3</a>
                    </div>
                </div>
                <div className="ui main text container add-margin">
                    {!this.props.network && 
                        <div className="offline-display">
                            <h3 className="offline-msg">You are currently offline</h3>
                            <button className="ui button red offline-button" onClick={this.retryProfileSubmit}>Submit current changes</button>
                        </div>
                    }
                    <div className="first-segment ui segment">
                        <div className="flex-row">
                            <div className="profile-pic-container">
                                <img className="profile-pic " src={this.props.network ? profile.profileImage : profile.profileImage.preview} alt="profile" />
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
        network: state.network
    };
}

export default connect(mapStateToProps, { fetchProfile, retrySubmit })(Profile);
