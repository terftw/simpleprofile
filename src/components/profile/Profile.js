import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingSpinner from '../spinner/LoadingSpinner';
import { fetchProfile } from '../../actions';
import './profile.css';

class Profile extends Component {
    componentDidMount() {
        this.props.fetchProfile();
    }
    renderList = () => {
        return this.props.profile.length !== 0 && this.props.profile.workExperience.map((item, index, arr) => {
            const endMonthString = item.isCurrentJob ? "Present" :`${item.endMonth} ${item.endYear}`;

            return (
                <div key={index}>
                    <div className="job-item-segment">
                        <div className="job-item">
                            <div className="company-logo">
                                <img className="" src={item.companyLogo} height="40" width="40" alt="company logo"/>
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
        console.log(this.props);
        return (
            <div>
                <div className="ui pointing menu">
                    <div className="ui container">
                        <a href="#" className="header item">Test 1</a>
                        <a href="#" className="item">Test 2</a>
                        <a href="#" className="item">Test 3</a>
                    </div>
                </div>
                <div className="ui main text container add-margin">
                    <div className="first-segment ui segment">
                        <div className="flex-row">
                            <div className="profile-pic-container">
                                <img className="profile-pic " src={profile.profileImage} alt="profile" />
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
    return { profile: state.profile };
}

export default connect(mapStateToProps, { fetchProfile })(Profile);
